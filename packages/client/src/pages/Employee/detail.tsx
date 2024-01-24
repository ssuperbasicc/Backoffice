import React, { useState } from "react"
import {
    Card,
    Table,
    Badge,
    Button
} from "react-bootstrap"
import { icon } from "."
import API from "../../utilities/axios"
import { useParams } from "react-router-dom"
import { CiTrash } from "react-icons/ci"
import { CiEdit } from "react-icons/ci"
import { useNavigate } from "react-router-dom"
import goBack from "../../utilities/goBack"

const DetailEmployee: React.FC = () => {
    const navigate = useNavigate()

    type EmployeePositionObj = {
        position: { name: string }
    }

    type DataObj = {
        id: number,
        name: string,
        username: string,
        workUnit: {id: number, name: string }
        createTimestamp: string,
        EmployeePosition: EmployeePositionObj[]
    }

    const { id } = useParams<{id: string}>()
    const intId = parseInt(id as string)

    const [data, setData] = useState<DataObj>({
        id: 0,
        name: "",
        username: "",
        workUnit: {
            id: 0,
            name: ""
        },
        createTimestamp: "",
        EmployeePosition: []
    })

    const getData = (): void => {
        API.get("/employee/single", {
            params: { 
                id: intId
            }
        })
        .then(res => {
            console.debug(res)
            setData({ ...res.data.result })
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleEdit = (): void => {
        navigate("/edit-employee/" + data.id)
    }

    const _handleDelete = (): void => {
        const confirm = window.confirm("Are you sure want to delete this data?")
        if (confirm) {
            API.delete("/employee", {
                data: { id: intId }
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
                            { icon } Detail Employee
                        </Card.Header>
                        <Card.Body>
                            <Table striped hover responsive size="lg">
                                <tbody>
                                    <tr>
                                        <td>Name</td>
                                        <td><strong>: {data.name}</strong></td>
                                        <td>Username</td>
                                        <td><strong>: {data.username}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Work Unit</td>
                                        <td><strong>: {data.workUnit.name}</strong></td>
                                        <td>Create Timestamp</td>
                                        <td><strong>: {data.createTimestamp}</strong></td>
                                    </tr>
                                    <tr>
                                        <td>Position</td>
                                        <td colSpan={3}>
                                            <strong> : &nbsp;
                                            { data.EmployeePosition.length === 0 && "-" }
                                            {
                                                data.EmployeePosition.map((d: EmployeePositionObj, i: number) => {
                                                    return (
                                                        <Badge
                                                            key={i}
                                                            style={{ marginRight: "8px" }}
                                                            bg="dark"
                                                        >
                                                            {d.position.name}
                                                        </Badge>
                                                    )
                                                })
                                            }
                                            </strong>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Card.Body>
                        <Card.Footer>
                            <div className="d-flex justify-content-end">
                                <Button
                                    size="sm"
                                    variant="primary"
                                    onClick={_handleEdit}
                                >
                                    <CiEdit />
                                    Edit
                                </Button>
                                &nbsp;
                                <Button
                                    size="sm"
                                    variant="danger"
                                    onClick={_handleDelete}
                                >
                                    <CiTrash />
                                    Delete
                                </Button>
                            </div>
                        </Card.Footer>
                    </Card.Body>
                </Card>

            </div>
        </>
    )
}

export default DetailEmployee