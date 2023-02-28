import {Button, Form, Modal} from "react-bootstrap";
import InputData from "../../../components/InputForm/InputForm";

export default function ModalCollection(props: any){
    const {values, onDataChange, onFormSubmit, onClose, show} = props
    return (
        <Modal show={show} onHide={onClose}>
            <Modal.Header closeButton>
                <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <InputData
                        name="name"
                        placeholder="Name"
                        type="text"
                        label="Name"
                        values={values}
                        onChange={onDataChange}
                    />
                    <InputData
                        name="description"
                        placeholder="description"
                        type="text"
                        label="description"
                        values={values}
                        onChange={onDataChange}
                    />
                    <InputData
                        name="theme"
                        placeholder="theme"
                        type="text"
                        label="theme"
                        values={values}
                        onChange={onDataChange}
                    />

                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onFormSubmit}>Create</Button>
            </Modal.Footer>
        </Modal>
    )
}