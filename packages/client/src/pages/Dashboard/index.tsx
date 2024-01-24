import React from "react"
import {
    Card,
    Row,
    Col,
    Table
} from "react-bootstrap"
import API from "../../utilities/axios"

const Dashboard: React.FC = () => {
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

    const [metadataTotal, setMetadataTotal] = React.useState<MetadataTotal>({
        totalEmployee: 0,
        totalPosition: 0,
        totalWorkUnit: 0,
        totalLogin: 0
    })

    const [dataTopLogin, setDataTopLogin] = React.useState<TopLogin[] | []>([])

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

    React.useEffect(() => {
        getData()
        getDataTopLogin()
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
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Header>
                            Top 10 Login (more than 25 times)
                        </Card.Header>
                        <Card.Body>
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
            </div>
        </>
    )
}

export default Dashboard