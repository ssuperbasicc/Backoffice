import React from "react"
import {
    Card,
    Button,
    Form,
    Row,
    Col
} from "react-bootstrap"
import { icon } from "."
import API from "../../utilities/axios"
import { useParams } from "react-router-dom"
import goBack from "../../utilities/goBack"

const EditPosition: React.FC = () => {
    const { id } = useParams<{ id: string }>()
    const intId = parseInt(id as string)

    const [name, setName] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")

    const getData = (): void => {
        API.get("/position/single", {
            params: { id: intId }
        })
        .then(res => {
            console.debug(res)
            setName(res.data.result.name)
            setDescription(res.data.result.description)
        })
        .catch(err => {
            console.debug(err)
        })
    }

    const _handleSubmit = (e: any): void => {
        e.preventDefault()

        API.put("/position", {
            id: intId, 
            name, 
            description
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

    React.useEffect(() => {
        getData()
    }, [])

    return (
        <>
            <div className="m-3">
                <Card>
                    <Form onSubmit={_handleSubmit}>
                        <Card.Body>
                            <Card.Header>
                                {icon}
                                Edit Position
                            </Card.Header>
                            <Card.Body>
                                <Row>
                                    <Col
                                        xl={8}
                                        lg={8}
                                        md={8}
                                    >
                                       <Form.Group>
                                            <Form.Label>
                                                Position Name
                                            </Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Enter position name"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </Form.Group>
                                        <Form.Group>
                                            <Form.Label>
                                                Position Description
                                            </Form.Label>
                                            <Form.Control 
                                                type="text"
                                                placeholder="Enter position description"
                                                value={description}
                                                onChange={e => setDescription(e.target.value)}
                                            />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        size="sm"
                                        type="submit"
                                        variant="primary"
                                    >
                                        Submit
                                    </Button>
                                    &nbsp;
                                    <Button
                                        size="sm"
                                        onClick={goBack}
                                        variant="danger"
                                    >
                                        Cancel
                                    </Button>
                                </div>
                            </Card.Footer>
                        </Card.Body>
                    </Form>
                </Card>
            </div>
        </>
    )
}

export default EditPosition