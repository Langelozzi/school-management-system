import React from 'react'
import Student from '../Student/Student';
import StudentForm from '../StudentForm/StudentForm';
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
            <StudentForm />
        </div>
    )
}
