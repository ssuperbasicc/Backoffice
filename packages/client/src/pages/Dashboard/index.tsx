import React, { useState } from "react"
import {
    Card,
    Row,
    Col,
    Table,
    Form,
    Button
} from "react-bootstrap"
import API from "../../utilities/axios"

type MetadataTotal = {
    totalEmployee: number
    totalPosition: number,
    totalWorkUnit: number,
    totalLogin: number
}

type TopLogin = {
    name: string
    totalLogin: string
}

type DataObjEmployee = {
    id: number,
    name: string,
    username: string,
    createTimestamp: string
}

type DataObjAuth = {
    id: string,
    jti: string,
    uid: number,
    createTimestamp: string
}

const Dashboard: React.FC = () => {
    const [metadataTotal, setMetadataTotal] = React.useState<MetadataTotal>({
        totalEmployee: 0,
        totalPosition: 0,
        totalWorkUnit: 0,
        totalLogin: 0
    })

    const getData = (): void => {
        API.get("/dashboard")
        .then(res => {
            console.debug(res)
            setMetadataTotal({ ...res.data.result })
        })
        .catch(err => {
            console.debug(err)
        })
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="m-3">
                <Row>
                    <Col
                        className="mt-1"
                        xl={3}
                        lg={3}
                        md={3}
                        sm={6}
                    >
                        <Card>
                            <Card.Body>
                                Total Employee <strong>: {metadataTotal.totalEmployee}</strong>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col
                        className="mt-1"
                        xl={3}
                        lg={3}
                        md={3}
                        sm={6}
                    >
                        <Card>
                            <Card.Body>
                                Total Position <strong>: {metadataTotal.totalPosition}</strong>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col
                        className="mt-1"
                        xl={3}
                        lg={3}
                        md={3}
                        sm={6}
                    >
                        <Card>
                            <Card.Body>
                                Total Work Unit <strong>: {metadataTotal.totalWorkUnit}</strong>
                            </Card.Body>
                        </Card>
                    </Col>
                    <Col
                        className="mt-1"
                        xl={3}
                        lg={3}
                        md={3}
                        sm={6}
                    >
                        <Card>
                            <Card.Body>
                                Total Login <strong>: {metadataTotal.totalLogin}</strong>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
                <TopLogin />
                <Row className="mt-3">
                    <Col
                        className="mt-1"
                        xl={6}
                        lg={6}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <EmployeeDisplay />
                    </Col>
                    <Col
                        className="mt-1"
                        xl={6}
                        lg={6}
                        md={12}
                        sm={12}
                        xs={12}
                    >
                        <AuthDisplay />
                    </Col>
                </Row>
            </div>
        </>
    )
}

const TopLogin: React.FC = () => {
    const [dataTopLogin, setDataTopLogin] = React.useState<TopLogin[] | []>([])

    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")

    const getDataTopLogin = (): void => {
        API.get("/dashboard/top-login")
        .then(res => {
            console.debug(res)
            setDataTopLogin([...res.data.result])
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleFilter = (): void => {
        if (
            startDate === ""
            || endDate === ""
        ) {
            window.alert("Please fill all field")
            return
        }

        API.get("/dashboard/top-login", {
            params: {
                startDate,
                endDate
            }
        })
        .then(res => {
            console.debug(res)
            setDataTopLogin([...res.data.result])
        })
        .catch(err => {
            console.debug(err)
        })
    }

    React.useEffect(() => {
        getDataTopLogin()
    }, [])

    return (
        <>
            <Card className="mt-3">
                <Card.Body>
                    <Card.Header>
                        Top 10 Login (more than 25 times)
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex">
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                            &nbsp;
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    
                                />
                            </Form.Group>
                            &nbsp;
                            <Button
                                size="sm"
                                className="mt-4"
                                onClick={_handleFilter}
                            >
                                Filter
                            </Button>
                        </div>
                        <hr />
                        <Table striped hover responsive size="lg">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Total Login</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    dataTopLogin.map((d: TopLogin, i: number) => {
                                        return (
                                            <tr key={i}>
                                                <td>{d.name}</td>
                                                <td>{d.totalLogin}</td>
                                            </tr>
                                        )
                                    })
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card.Body>
            </Card>
        </>
    )
}

const EmployeeDisplay: React.FC = () => {
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")

    const [data, setData] = React.useState<DataObjEmployee[] | []>([])

    const getData = (): void => {
        API.get("/dashboard/filter-employee", {
            params: {
                startDate,
                endDate
            }
        })
        .then(res => {
            console.debug(res)
            setData(res.data.result)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleFilter = (): void => {
        if (
            startDate === ""
            || endDate === ""
        ) {
            window.alert("Please fill all field")
            return
        }

        getData()
    }

    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Header>
                        Employee Data
                    </Card.Header>
                    <Card.Body>
                        <div className="d-flex">
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                            &nbsp;
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    
                                />
                            </Form.Group>
                            &nbsp;
                            <Button
                                size="sm"
                                className="mt-4"
                                onClick={_handleFilter}
                            >
                                Filter
                            </Button>
                        </div>
                        <hr />
                        <Table hover striped size="lg">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Username</th>
                                    <th>Create Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((d, i) => (
                                        <tr key={i}>
                                            <td>{d.name}</td>
                                            <td>{d.username}</td>
                                            <td>{d.createTimestamp}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card.Body>
            </Card>
        </>
    )
}

const AuthDisplay: React.FC = () => {
    const [startDate, setStartDate] = useState<string>("")
    const [endDate, setEndDate] = useState<string>("")

    const [data, setData] = React.useState<DataObjAuth[] | []>([])

    const getData = (): void => {
        API.get("/dashboard/filter-auth", {
            params: {
                startDate,
                endDate
            }
        })
        .then(res => {
            console.debug(res)
            setData(res.data.result)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleFilter = (): void => {
        if (
            startDate === ""
            || endDate === ""
        ) {
            window.alert("Please fill all field")
            return
        }

        getData()
    }
    return (
        <>
            <Card>
                <Card.Body>
                    <Card.Header>
                        Auth Data
                    </Card.Header>
                    <Card.Body>
                    <div className="d-flex">
                            <Form.Group>
                                <Form.Label>Start Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={startDate}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </Form.Group>
                            &nbsp;
                            <Form.Group>
                                <Form.Label>End Date</Form.Label>
                                <Form.Control
                                    type="date"
                                    value={endDate}
                                    onChange={e => setEndDate(e.target.value)}
                                    
                                />
                            </Form.Group>
                            &nbsp;
                            <Button
                                size="sm"
                                className="mt-4"
                                onClick={_handleFilter}
                            >
                                Filter
                            </Button>
                        </div>
                        <hr />
                        <Table hover striped size="lg">
                            <thead>
                                <tr>
                                    <th>JTI</th>
                                    <th>UID</th>
                                    <th>Create Timestamp</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    data.map((d, i) => (
                                        <tr key={i}>
                                            <td>{d.jti}</td>
                                            <td>{d.uid}</td>
                                            <td>{d.createTimestamp}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>                        
                    </Card.Body>
                </Card.Body>
            </Card>
        </>
    )
}

export default Dashboard