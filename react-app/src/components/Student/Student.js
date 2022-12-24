import React from 'react'
import { Accordion, Button, Modal } from 'react-bootstrap'
import './Student.css';
import { getStudentAverageGrade, deleteStudent } from '../../service/studentService'
import StudentForm from '../StudentForm/StudentForm';

export default function Student({ student, fetchStudents }) {
    // A state (variable) to handle the showing and closing of the modal form
    const [show, setShow] = React.useState(false);

    const [averageResult, setAverageResult] = React.useState('');

    // methods for closing and showing the modal
    function handleShow() { setShow(true) };

    function handleClose() { setShow(false) };

    // method for calling average api endpoint
    async function getAndDisplayAverage() {
        const averageObj = await getStudentAverageGrade(student.id)
        const averageString = `${averageObj.average.toPrecision(3)}%`;

        setAverageResult(averageString);
    }

    // method for deleting the student
    async function deleteThisStudent() {
        await deleteStudent(student.id);
        await fetchStudents();

        handleClose();
    }

    return (
        <Accordion className='student-accordian' defaultActiveKey="0">
            <Accordion.Item>
                <Accordion.Header>
                    <h5>{`${student.name} (${student.id})`}</h5>
                </Accordion.Header>
                <Accordion.Body>
                    <table className='student-info-table'>
                        <tbody>

                            <tr>
                                <td className='info-cell'>
                                    <div>
                                        <h4>Personal Information</h4>
                                        <p> <strong> Age: </strong> {student.age}</p>
                                    </div>
                                </td>
                                <td className='info-cell'>
                                    <div className='course-grades-table'>
                                        <h4>Grades</h4>
                                        <table>
                                            <thead>
                                                <tr>
                                                    <th className='course-table-header'>Course</th>
                                                    <th>Current Grade</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    Object.entries(student.courseGrades).map(([course, grade]) => {
                                                        return (
                                                            <tr key={`${course}-${student.id}`}>
                                                                <td>{course}</td>
                                                                <td className='grade-cell'>{`${grade}%`}</td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    </div>
                                </td>
                                <td className='info-cell'>
                                    <div className='text-center'>
                                        <h4 className='average-title'>Average</h4>
                                        <h5>{averageResult}</h5>
                                        <Button onClick={getAndDisplayAverage}>Calculate Average</Button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>

                    <div className='student-btn-container'>
                        <Button variant='danger' onClick={handleShow}>Delete</Button>
                        <StudentForm fetchStudents={fetchStudents} edit={true} student={student} />
                    </div>

                    <Modal
                        show={show}
                        onHide={handleClose}
                    >
                        <Modal.Header closeButton>
                            <Modal.Title>Delete Student</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>Are you sure you would like to delete {student.name} from the database?</Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>
                                Cancel
                            </Button>
                            <Button variant="danger" onClick={deleteThisStudent}>
                                Delete
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Accordion.Body>
            </Accordion.Item>
        </Accordion>
    )
}
