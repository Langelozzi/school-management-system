import React from 'react'
import { Button } from 'react-bootstrap';
import Student from '../Student/Student';
import './StudentList.css';

export default function StudentList({ students }) {
    return (
        <div id='student-list-container'>
            <div id='student-list'>
                <h1>Students</h1>
                {
                    students.map(student => {
                        return <Student key={student.id} student={student} />
                    })
                }
            </div>
            <div className='text-center'>
                <Button variant='success'> &#x2b; New Student </Button>
            </div>
            {/* add pop up modal for creating a new one */}
        </div>
    )
}
