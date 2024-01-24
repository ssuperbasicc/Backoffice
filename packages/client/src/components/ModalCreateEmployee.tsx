import React from "react"
import {
    Modal,
    Form,
    Button
} from "react-bootstrap"
import API from "../utilities/axios"

type ModalPropsType = {
    currentState: string
    show: boolean
    handleClose: () => void
    refetch: () => void
}

const ModalCreateEmployee: React.FC<ModalPropsType> = (props) => {
    const [name, setName] = React.useState<string>("")
    const [description, setDescription] = React.useState<string>("")

    const _handleClearState = (): void => {
        setName("")
        setDescription("")
    }

    const stateApiUri = props.currentState === "Position" ? "/position" : "/work-unit"

    const _handleSubmit = (e: any): void => {
        e.preventDefault()

        if (name === "" || description === "") {
            window.alert("Please fill all field")
            return
        }

        API.post(stateApiUri, {
            name,
            description
        })
        .then(res => {
            console.debug(res)
            props.refetch()
            window.alert("Successfully")
            props.handleClose()
            _handleClearState()
        })
        .catch(err => {
            console.debug(err)
        })
    }

    return (
        <>
        <Modal show={props.show} onHide={props.handleClose}>
            <Form  onSubmit={_handleSubmit}>
                <Modal.Header closeButton>
                    <Modal.Title>Create {props.currentState}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group>
                        <Form.Label>{props.currentState} Name</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder={`Enter ${props.currentState.toLowerCase()} name`}
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>{props.currentState} Description</Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder={`Enter ${props.currentState.toLowerCase()} description`}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">
                        Submit
                    </Button>
                    <Button variant="secondary" onClick={() => {
                        props.handleClose()
                        _handleClearState()
                    }}>
                        Close
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
        </>
    )
}

export default ModalCreateEmployee