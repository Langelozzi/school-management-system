import React from 'react'
import Student from '../Student/Student';
import StudentForm from '../StudentForm/StudentForm';
import { getAllStudents } from '../../service/studentService';
import './StudentList.css';

export default function StudentList() {
    // Destructure a constant for the students array and a method for setting its value
    const [students, setStudents] = React.useState([]);

    async function fetchStudents() {
        let res = await getAllStudents();
        setStudents(res);
    }

    // Use effect with an empty array means it will execute on page load once
    React.useEffect(() => {
        fetchStudents();
    }, []);

    return (
        <div id='student-list-container'>
            <div id='student-list'>
                <h1>Students</h1>
                {
                    students.map(student => {
                        return <Student key={student.id} student={student} fetchStudents={fetchStudents} />
                    })
                }
            </div>
            <div className='text-center'>
                <StudentForm fetchStudents={fetchStudents} />
            </div>
        </div>
    )
}
