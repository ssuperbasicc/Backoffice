import React from "react"
import { 
    Card,
    Button,
    Table,
    Row,
    Col
} from "react-bootstrap"
import { IoPeopleSharp } from "react-icons/io5"
import { useNavigate } from "react-router-dom"
import API from "../../utilities/axios"
import { IoMdAdd } from "react-icons/io"

export const icon = <IoPeopleSharp style={{ marginRight: "8px" }} />

const Employee: React.FC = () => {
    const navigate = useNavigate()

    type DataObj = {
        id: number,
        name: string,
        username: string,
        workUnit: { name: string },
        createTimestamp: string
    }

    const [data, setData] = React.useState<DataObj[] | []>([])

    const getData = (): void => {
        API.get("/employee")
        .then(res => {
            console.debug(res)
            setData(res.data.result)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleCreate = (): void => {
        navigate("/create-employee")
    }

    const _handleDetail = (id: number): void => {
        navigate("/detail-employee/" + id)
    }

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="m-3">
                <Card>
                    <Card.Body>
                        <Card.Header>
                            <Row>
                                <Col>
                                    { icon }
                                    Employee
                                </Col>
                                <Col className="d-flex justify-content-end">
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        onClick={_handleCreate}
                                    >
                                        <IoMdAdd /> Create
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Table hover striped size="lg">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Username</th>
                                        <th>Work Unit</th>
                                        <th>Create Timestamp</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((d, i) => (
                                            <tr key={i}>
                                                <td>{d.name}</td>
                                                <td>{d.username}</td>
                                                <td>{d.workUnit.name}</td>
                                                <td>{d.createTimestamp}</td>
                                                <td 
                                                    style={{ cursor: 'pointer' }} 
                                                    onClick={() => _handleDetail(d.id)}
                                                >
                                                    <strong>...</strong>
                                                </td>
                                            </tr>
                                        ))
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

export default Employee