import React from "react"
import API from "../../utilities/axios"
import { BiSolidCategoryAlt } from "react-icons/bi"
import { CiTrash } from "react-icons/ci"
import { CiEdit } from "react-icons/ci"
import { IoMdAdd } from "react-icons/io"
import { 
    Card,
    Row,
    Col,
    Table,
    Button
} from "react-bootstrap"
import { useNavigate } from "react-router-dom"

export const icon = <BiSolidCategoryAlt style={{ marginRight: "8px" }} />

const WorkUnit: React.FC = () => {

    const navigate = useNavigate()

    type DataObj = {
        id: number,
        name: string,
        description: string
    }

    const [data, setData] = React.useState<DataObj[] | []>([])

    const getData = (): void => {
        API.get("/work-unit")
        .then(res => {
            console.debug(res)
            setData(res.data.result)
        })
        .catch(err =>{
            console.debug(err)
        })
    }

    const _handleEdit = (id: number): void => {
        navigate("/edit-work-unit/" + id)
    }

    const _handleDelete = (id: number): void => {
        const confirm = window.confirm("Are you sure want to delete the data?")

        if (confirm) {
            API.delete("/work-unit", {
                data: { id }
            })
            .then(res => {
                console.debug(res)
                window.alert("Successfully")
                getData()
            })
            .catch(err => {
                console.debug(err)
            })
        }
    }

    const _handleCreate = (): void => {
        navigate("/create-work-unit")
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
                                    Work Unit
                                </Col>
                                <Col className="d-flex justify-content-end">
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
                            <Table hover striped responsive size="lg">
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

export default WorkUnit