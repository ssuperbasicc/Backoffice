import React from "react"
import {
    Card,
    Form,
    Button,
    Row,
    Col
} from "react-bootstrap"
import { icon } from "."
import goBack from "../../utilities/goBack"
import { useParams } from "react-router-dom"
import API from "../../utilities/axios"
import Select from "react-select"
import ModalCreateEmployee from "../../components/ModalCreateEmployee"

const EditEmployee: React.FC<{id: string}> = () => {
    const { id } = useParams<{id: string}>()
    const intId = parseInt(id as string)

    type PositionList = {
        id: number,
        name: string,
        description: string
    }

    type WorkUnitList = {
        id: number,
        name: string,
        description: string
    }

    type EmployeePositionObj = {
        employeeId: number,
        positionId: number,
        position: { name: string }
    }

    type DataObjPosition = {
        value: number,
        label: string
    }

    type DataObjWorkUnit = {
        value: number,
        label: string
    }

    const [name, setName] = React.useState<string>("")
    const [username, setUsername] = React.useState<string>("")
    const [workUnitId, setWorkUnitId] = React.useState<number | null>(null)
    const [listPositionId, setListPositionId] = React.useState<number[] | []>([])
    const [cacheListPositionId, setCachePositionId] = React.useState<number[] | []>([])

    const [position, setPosition] = React.useState<DataObjPosition[] | []>([])
    const [workUnit, setWorkUnit] = React.useState<DataObjWorkUnit[] | []>([])

    const [currentPosition, setCurrentPosition] = React.useState<DataObjPosition[] | []>([])
    const [currentWorkUnit, setCurrentWorkUnit] = React.useState<DataObjWorkUnit>({value: 0, label: ""})

    const [toggleModal, setToggleModal] = React.useState<boolean>(false)
    const [currentState, setCurrentState] = React.useState<string>("")

    const _handleModal = (): void => {
        setToggleModal(!toggleModal)
    }
    
    const getDataEmployee = (): void => {
        API.get("/employee/single", {
            params: { id: intId }
        })
        .then(async res => {
            console.debug(res)

            const result = res.data.result
            let customList: number[] = []

            setName(result.name)
            setUsername(result.username)
            setWorkUnitId(result.workUnitId)

            async function processValuePosition () {
                result.EmployeePosition.forEach((d: EmployeePositionObj) => {
                    customList.push(d.positionId)
                })
            }

            await processValuePosition()

            setListPositionId(customList)

            getDataPosition(customList)
            getDataWorkUnit(result.workUnitId)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const getDataPosition = (customList: number[]): void => {
        API.get("/position")
        .then(async res => {
            console.debug(res)
            let list: DataObjPosition[] = []
            let currentValueList: DataObjPosition[] = []
            let cacheList: number[] = []

            async function transformVal () {
                res.data.result.forEach((d: PositionList) => {
                    list.push({ value: d.id, label: d.name })
                })

                customList.forEach((d: number) => {
                    const filteredPosition = res.data.result.filter((f: PositionList) => f.id === d)
                    currentValueList.push({ value: filteredPosition[0].id , label: filteredPosition[0].name })
                    cacheList.push(filteredPosition[0].id)
                })
            }

            await transformVal()
            setPosition(list)
            setCurrentPosition(currentValueList)
            setCachePositionId(cacheList)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const getDataWorkUnit = (workUnitId: number): void => {
        API.get("/work-unit")
        .then(async res => {
            console.debug(res)
            let list: DataObjWorkUnit[] = []
            let currentValueObj: DataObjWorkUnit = {value: 0, label: ""}

            async function transformVal () {
                res.data.result.forEach((d: WorkUnitList) => {
                    list.push({ value: d.id, label: d.name })
                })

                const currentWorkUnit = res.data.result.filter((f: WorkUnitList) => f.id === workUnitId)
                currentValueObj = {value: currentWorkUnit[0].id, label: currentWorkUnit[0].name}
            }

            await transformVal()

            setWorkUnit(list)
            setCurrentWorkUnit(currentValueObj)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleSubmit = async (e: any): Promise<void> => {
        e.preventDefault()

        if (
            name === ""
            || username === ""
            || workUnitId === null
            || listPositionId.length === 0
        ) {
            window.alert("Please fill all field")
            return
        }

        const listToCreate: number[] = []
        const listToDelete: number[] = []

        async function calcListElement () {
            // compare old list to new list, catch the umatch value to delete
            cacheListPositionId.forEach((d: number) => {
                let isExist: boolean = false

                listPositionId.forEach((x: number) => {
                    if (d === x) {
                        isExist = true
                    }
                })

                if (!isExist) {
                    listToDelete.push(d)
                }
            })

            // compare new list to old list, catch the unmatch value to create
            listPositionId.forEach((d: number) => {
                let isExist: boolean = false

                cacheListPositionId.forEach((x: number) => {
                    if (d === x) {
                        isExist = true
                    }
                })

                if (!isExist) {
                    listToCreate.push(d)
                }
            })
        }

        await calcListElement()

        API.put("/employee", {
            id: intId,
            name,
            username,
            workUnitId,
            listPositionIdToCreate: listToCreate,
            listPositionIdToDelete: listToDelete
        })
        .then(res => {
            console.debug(res)
            window.alert("Successfully")
            goBack()
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleChangePosition = async (data: readonly DataObjPosition[]): Promise<void> => {
        setCurrentPosition([...data])

        if (data.length > 0) {
            let customList: number[] = []

            async function processValue () {
                data.forEach((d) => {
                    customList.push(d.value)
                })
            }

            await processValue()

            setListPositionId(customList)
        } else {
            setListPositionId([])
        }
    }

    const _handleChangeWorkUnit = (data: DataObjWorkUnit | null): void => {
        if (data) {
            setWorkUnitId(data.value)
            setCurrentWorkUnit(data)
        }
    }

    React.useEffect(() => {
        getDataEmployee()
    }, [])

    return (
        <>
            <div className="m-3">
                <Card>
                    <Form onSubmit={_handleSubmit}>
                        <Card.Body>
                            <Card.Header>
                                { icon } Edit Employee
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col
                                         xl={8}
                                         lg={8}
                                         md={8}
                                    >
                                         <Form.Group>
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Enter employee name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Username</Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Enter employee username"
                                                value={username}
                                                onChange={e => setUsername(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Position</Form.Label>
                                            <Row>
                                                <Col
                                                    xl={10}
                                                    lg={10}
                                                    md={10}
                                                    sm={10}
                                                    xs={10}
                                                >
                                                    <Select 
                                                        options={position} 
                                                        isMulti
                                                        value={currentPosition}
                                                        className="basic-multi-select"
                                                        onChange={_handleChangePosition}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            setCurrentState("Position")
                                                            _handleModal()
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>Work Unit</Form.Label>
                                            <Row>
                                                <Col
                                                    xl={10}
                                                    lg={10}
                                                    md={10}
                                                    sm={10}
                                                    xs={10}
                                                >
                                                    <Select 
                                                        value={currentWorkUnit}
                                                        options={workUnit}
                                                        onChange={_handleChangeWorkUnit}
                                                    />
                                                </Col>
                                                <Col>
                                                    <Button
                                                        size="sm"
                                                        onClick={() => {
                                                            setCurrentState("Work Unit")
                                                            _handleModal()
                                                        }}
                                                    >
                                                        Add
                                                    </Button>
                                                </Col>
                                            </Row>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="sm"
                                    >
                                        Submit
                                    </Button>
                                    &nbsp;
                                    <Button
                                        size="sm"
                                        variant="danger"
                                        onClick={goBack}
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card.Body>
                    </Form>
                </Card>
            </div>

            <ModalCreateEmployee 
                currentState={currentState}
                show={toggleModal}
                handleClose={_handleModal}
                refetch={getDataEmployee}
            />
        </>
    )
}

export default EditEmployee