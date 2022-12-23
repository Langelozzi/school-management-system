import React from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'

export default function StudentForm() {
    // A state (variable) to handle the showing and closing of the modal form
    const [show, setShow] = React.useState(false);
    // A state for storing the name input value
    const [nameInputValue, setNameInputValue] = React.useState({ name: '' });
    // A state for storing the age input value
    const [ageInputValue, setAgeInputValue] = React.useState({ age: '' });
    // A state for storing the course input values
    const [courseInputValues, setCourseInputValues] = React.useState([{ course: '', grade: '' }]);

    // methods for closing and showing the modal
    const handleClose = () => { setShow(false) };
    const handleShow = () => { setShow(true) };

    // method for updating the input value
    function updateInputValue(stateSetter, event) {
        const value = event.target.value;

        stateSetter(value);
    }

    // method for submitting the new student data to the database
    function submitForm() {
        const newStudentReqBody = {
            name: nameInputValue,
            age: Number(ageInputValue),
            courseGrades: courseInputValues
        };

        console.log(newStudentReqBody);

        handleClose();
    }

    return (
        <div>
            <div className='text-center'>
                <Button variant='success' onClick={handleShow}> &#x2b; New Student </Button>
            </div>

            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title> Add a New Student </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="form-name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Student full name"
                                onChange={event => updateInputValue(setNameInputValue, event)}
                            />
                            {/* ###could use this for errors### <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text> */}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="form-age">
                            <Form.Label>Age</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Age (years)"
                                onChange={event => updateInputValue(setAgeInputValue, event)}
                            />
                        </Form.Group>

                        {/* {
                            courseInputValues.map((element, index) => {
                                return (

                                )
                            })
                        } */}
                        <Row>
                            <Col xs={8}>
                                <Form.Group className="mb-3" controlId="form-age">
                                    <Form.Label> Course </Form.Label>
                                    <Form.Control type="text" placeholder="Course number (e.g. COMP 1510)" />
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3" controlId="form-age">
                                    <Form.Label> Grade </Form.Label>
                                    <Form.Control type="number" placeholder="Grade (%)" />
                                </Form.Group>
                            </Col>
                        </Row>
                    </Form>
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="success" onClick={submitForm}>
                        Add
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    )
}
