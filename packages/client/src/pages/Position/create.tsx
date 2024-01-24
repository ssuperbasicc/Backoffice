import React from "react"
import {
    Card,
    Row,
    Col,
    Button,
    Form
} from "react-bootstrap"
import goBack from "../../utilities/goBack"
import { icon } from "."
import API from "../../utilities/axios"

const CreatePosition: React.FC = () => {
    const [name, setName] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")

    const _handleSubmit = (e: any): void => {
        e.preventDefault()

        if (name === "" || description === "") {
            window.alert("Please fill all field")
            return
        }

        API.post("/position", {
            name,
            description
        })
        .then(res => {
            console.debug(res)
            window.alert("Successfully.")
            goBack()
        })
        .catch(err => {
            console.debug(err)
        })

    }

    return (
        <>
            <div className="m-3">
                <Card>
                    <Form onSubmit={_handleSubmit}>
                        <Card.Body>
                            <Card.Header>
                                {icon}
                                Create New Position
                            </Card.Header>
                            <Card.Body>
                            <Row>
                                <Col
                                    lg={8}
                                    xl={8}
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
                                        variant="primary"
                                        size="sm"
                                        type="submit"
                                    >
                                        Submit
                                    </Button>
                                    &nbsp;
                                    <Button
                                        variant="danger"
                                        size="sm"
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
        </>
    )
}

export default CreatePosition