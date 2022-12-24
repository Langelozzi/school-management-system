import React from 'react'
import { Button, Modal, Form, Row, Col } from 'react-bootstrap'
import { postStudent, putStudent } from '../../service/studentService';

export default function StudentForm({ fetchStudents, edit, student }) {
    // A state (variable) to handle the showing and closing of the modal form
    const [show, setShow] = React.useState(false);
    // A state for storing the name input value
    const [nameInputValue, setNameInputValue] = React.useState('');
    // A state for storing the age input value
    const [ageInputValue, setAgeInputValue] = React.useState('');
    // A state for storing the course input values
    const [courseInputValues, setCourseInputValues] = React.useState([{ course: '', grade: '' }]);

    // methods for closing and showing the modal
    function handleShow() { setShow(true) };

    function handleClose() { setShow(false) };

    React.useEffect(() => {
        if (edit) {
            function autoFillForm() {
                setNameInputValue(student.name);
                setAgeInputValue(student.age);

                let courseFormValues = [];
                for (const [course, grade] of Object.entries(student.courseGrades)) {
                    courseFormValues.push({ course: course, grade: grade })
                }

                setCourseInputValues(courseFormValues);
            }

            autoFillForm();
        }
    }, [edit, student]);

    // method for updating the input value
    function updateInputValue(stateSetter, event, index = null) {
        const value = event.target.value;

        // will have index if modifying a course or grade
        if (index != null) {
            let formValues = [...courseInputValues];
            formValues[index][event.target.name] = value;
            stateSetter(formValues);
        } else {
            stateSetter(value);
        }

    }

    function addCourseInput() {
        setCourseInputValues(
            [...courseInputValues, { course: '', grade: '' }]
        )
    }

    function removeCourseInput(index) {
        let formValues = [...courseInputValues];

        // 2nd param means to only remove one item
        formValues.splice(index, 1);

        setCourseInputValues(formValues);
    }

    function resetForm() {
        setNameInputValue('');
        setAgeInputValue('');
        setCourseInputValues([{ course: '', grade: '' }]);
    }

    // method for submitting the new student data to the database
    async function createStudent() {
        const courseGrades = {};

        for (const courseGrade of courseInputValues) {
            if (courseGrade.course !== '') {
                courseGrades[courseGrade.course] = Number(courseGrade.grade);
            }
        }

        const newStudentReqBody = {
            name: nameInputValue,
            age: Number(ageInputValue),
            courseGrades: courseGrades
        };

        await postStudent(newStudentReqBody);
        await fetchStudents();

        handleClose();
    }
    // method for submitting the updated student data to the database
    async function updateStudent() {
        const courseGrades = {};

        for (const courseGrade of courseInputValues) {
            if (courseGrade.course !== '') {
                courseGrades[courseGrade.course] = Number(courseGrade.grade);
            }
        }

        const updatedStudentReqBody = {
            name: nameInputValue,
            age: Number(ageInputValue),
            courseGrades: courseGrades
        };

        await putStudent(student.id, updatedStudentReqBody)
        await fetchStudents();

        handleClose();
    }

    return (
        <span>
            <Button variant={edit ? 'warning' : 'success'} onClick={handleShow}> {edit ? 'Edit' : '+ New Student'} </Button>

            <Modal show={show} onHide={handleClose} size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered>
                <Modal.Header closeButton>
                    <Modal.Title> {edit ? 'Edit Student' : 'Add a New Student'} </Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId="form-name">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Student full name"
                                value={nameInputValue}
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
                                value={ageInputValue}
                                onChange={event => updateInputValue(setAgeInputValue, event)}
                            />
                        </Form.Group>

                        <Row>
                            <Col xs={8}>
                                <Form.Label> Course </Form.Label>
                            </Col>
                            <Col xs={3}>
                                <Form.Label> Grade (%) </Form.Label>
                            </Col>
                        </Row>
                        {
                            courseInputValues.map((element, index) => {
                                return (
                                    <Row key={index}>
                                        <Col xs={8}>
                                            <Form.Group className="mb-3" controlId={`form-course-${index}`}>
                                                <Form.Control
                                                    type="text"
                                                    placeholder="Course number (e.g. COMP 1510)"
                                                    name='course'
                                                    value={element.course}
                                                    onChange={event => updateInputValue(setCourseInputValues, event, index)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col xs={3}>
                                            <Form.Group className="mb-3" controlId={`form-grade-${index}`}>
                                                <Form.Control
                                                    type="number"
                                                    placeholder="Grade (%)"
                                                    name='grade'
                                                    value={element.grade}
                                                    onChange={event => updateInputValue(setCourseInputValues, event, index)}
                                                />
                                            </Form.Group>
                                        </Col>
                                        <Col>
                                            {
                                                index === 0 ?
                                                    null
                                                    :
                                                    <Button
                                                        variant='danger'
                                                        onClick={() => removeCourseInput(index)}
                                                    >
                                                        &#x2715;
                                                    </Button>

                                            }
                                        </Col>
                                    </Row>
                                )
                            })
                        }
                    </Form>
                    <div className='text-center'>
                        <Button variant='primary' onClick={addCourseInput}>Add Course</Button>
                    </div>
                </Modal.Body>

                <Modal.Footer className={edit ? '' : 'justify-content-between'}>
                    {
                        edit ?
                            null
                            :
                            <Button variant='warning' onClick={resetForm}>
                                Reset Form
                            </Button>
                    }
                    <div>
                        <Button variant="secondary" className='mx-2' onClick={handleClose}>
                            Cancel
                        </Button>
                        {
                            edit ?
                                <Button variant="success" onClick={updateStudent}>
                                    Save Changes
                                </Button>
                                :
                                <Button variant="success" onClick={createStudent}>
                                    Add
                                </Button>
                        }
                    </div>
                </Modal.Footer>
            </Modal>
        </span >
    )
}
