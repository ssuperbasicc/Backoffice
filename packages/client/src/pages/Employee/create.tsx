import React from "react"
import {
    Button,
    Card,
    Form,
    Row,
    Col
} from "react-bootstrap"
import { icon } from "."
import goBack from "../../utilities/goBack"
import API from "../../utilities/axios"
import Select from "react-select"
import ModalCreateEmployee from "../../components/ModalCreateEmployee"

const CreateEmployee: React.FC = () => {
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

    const [position, setPosition] = React.useState<DataObjPosition[] | []>([])
    const [workUnit, setWorkUnit] = React.useState<DataObjWorkUnit[] | []>([])

    const [toggleModal, setToggleModal] = React.useState<boolean>(false)
    const [currentState, setCurrentState] = React.useState<string>("")

    const _handleModal = (): void => {
        setToggleModal(!toggleModal)
    }

    const getDataPosition = (): void => {
        API.get("/position")
        .then(async res => {
            console.debug(res)
            let list: DataObjPosition[] = []

            async function transformVal () {
                res.data.result.forEach((d: PositionList) => {
                    list.push({ value: d.id, label: d.name })
                })
            }

            await transformVal()

            setPosition(list)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const getDataWorkUnit = (): void => {
        API.get("/work-unit")
        .then(async res => {
            console.debug(res)
            let list: DataObjWorkUnit[] = []

            async function transformVal () {
                res.data.result.forEach((d: WorkUnitList) => {
                    list.push({ value: d.id, label: d.name })
                })
            }

            await transformVal()

            setWorkUnit(list)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleSubmit = (e: any): void => {
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

        API.post("/employee", {
            name,
            username,
            workUnitId,
            listPositionId
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
        }
    }

    const _handleRefetchMetadata = (): void => {
        getDataPosition()
        getDataWorkUnit()
    }

    React.useEffect(() => { 
        getDataPosition()
        getDataWorkUnit()
    }, [])

    return (
        <>
            <div className="m-3">
                <Card>
                    <Form onSubmit={_handleSubmit}>
                        <Card.Body>
                            <Card.Header>
                                { icon }
                                Create New Employee
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
                                        type="submit"
                                        variant="primary"
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
                refetch={_handleRefetchMetadata}
            />
        </>
    )
}

export default CreateEmployee