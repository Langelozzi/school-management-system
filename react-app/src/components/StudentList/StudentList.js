import React from 'react'

export default function StudentList({ students }) {
    function showStudents() {
        console.log(students);
    }

    return (
        <div>
            <button onClick={showStudents}>Students</button>
        </div>
    )
}
