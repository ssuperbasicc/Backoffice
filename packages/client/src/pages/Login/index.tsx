import React from "react"
import { 
    Card, 
    Form, 
    Button
} from "react-bootstrap"
import API from "../../utilities/axios"
import { useNavigate } from "react-router-dom"

const Login: React.FC = () => {
    const navigate = useNavigate()

    const [username, setUsername] = React.useState<string>("")
    const [password, setPassword] = React.useState<string>("")

    const _handleSubmit = (e: any): void => {
        e.preventDefault()

        if (username === "" || password === "") {
            window.alert("Please fill all field")
            return
        }

        API.post("/auth", {
            username,
            password
        })
        .then(res => {
            console.debug(res)
            const result = res.data.result
            window.sessionStorage.setItem("token", result)
            navigate("/")
            window.location.reload()
        })

        .catch(err => {
            console.debug(err)
            window.alert(err?.response?.data?.responseMessage)
        })

    }

    return (
        <>
            <div className="container-fluid d-flex justify-content-center h-100 mt-5 p-5">
                <Card style={{ minWidth: "22rem" }}>
                    <Form onSubmit={_handleSubmit}>
                        <Card.Body>
                            <Card.Header>
                                <h5><strong>Sign In</strong></h5>
                            </Card.Header>
                            <Card.Body>
                               <Form.Group>
                                    <Form.Label>Username</Form.Label>
                                    <Form.Control 
                                        type="text"
                                        placeholder="Enter username"
                                        value={username}
                                        onChange={e => setUsername(e.target.value)}
                                    />
                               </Form.Group>
                               <Form.Group>
                                    <Form.Label>Password</Form.Label>
                                    <Form.Control 
                                        type="password"
                                        placeholder="Enter password"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                               </Form.Group>
                            </Card.Body>
                            <Card.Footer>
                                <div className="d-flex justify-content-end">
                                    <Button
                                        variant="primary"
                                        type="submit"
                                        size="sm"
                                    >
                                        Sign In
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

export default Login