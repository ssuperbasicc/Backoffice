import React from "react"
import {
    Card,
    Table,
    Button,
    Row,
    Col,
} from "react-bootstrap"
import { FaNetworkWired } from "react-icons/fa"
import API from "../../utilities/axios"
import { CiTrash } from "react-icons/ci"
import { CiEdit } from "react-icons/ci"
import { IoMdAdd } from "react-icons/io"
import { useNavigate } from "react-router-dom"

export const icon = <FaNetworkWired style={{ marginRight: "8px" }} />

const Position: React.FC = () => {
    const navigate = useNavigate()

    type DataObj = {
        id: number,
        name: string,
        description: string
    }

    const [data, setData] = React.useState<DataObj[] | []>([])

    const getData = (): void => {
        API.get("/position")
        .then(res => {
            console.debug(res)
            setData(res.data.result)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleDelete = (id: number): void => {
        const confirm = window.confirm("Are you sure want to delete the data?")

        if (confirm) {
            API.delete("/position", {
                data: {id}
            })
            .then(res => {
                console.debug(res)
                getData()
                window.alert("Successfully")
            })
            .catch(err => {
                console.debug(err)
            })
        }
    }

    const _handleEdit = (id: number): void => {
        navigate("/edit-position/" + id)
    }

    const _handleCreate = (): void => {
        navigate("/create-position")
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
                                    {icon}
                                    Position
                                </Col>
                                <Col className="d-flex justify-content-end" style={{ cursor: "pointer" }}>
                                    <Button
                                        size="sm"
                                        variant="primary"
                                        onClick={_handleCreate}
                                    >
                                        <IoMdAdd /> Create
                                    </Button>
                                </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Table striped hover responsive size="lg">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Description</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        data.map((d, i) => (
                                            <tr key={i}>
                                                <td>{d.name}</td>
                                                <td>{d.description}</td>
                                                <td>
                                                    <Button
                                                        size="sm"
                                                        variant="primary"
                                                        onClick={() => _handleEdit(d.id)}
                                                    >
                                                        <CiEdit /> Edit
                                                    </Button>
                                                    &nbsp;
                                                    <Button
                                                        size="sm"
                                                        variant="danger"
                                                        onClick={() => _handleDelete(d.id)}
                                                    >
                                                        <CiTrash /> Delete
                                                    </Button>
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

export default Position