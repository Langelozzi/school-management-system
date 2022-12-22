import React, { useEffect } from 'react';
import { getAllStudents } from './service/studentService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav/Nav';
import StudentList from './components/StudentList/StudentList';

function App() {
    // Deconstruct a constant for the students array and a method for setting its value
    const [students, setStudents] = React.useState([]);

    // Use effect with an empty array means it will execute on page load once
    useEffect(() => {
        async function fetchStudents() {
            let res = await getAllStudents();
            setStudents(res);
        }
        fetchStudents();
    }, []);

    return (
        <Router>
            <Nav />
            <div className='content'>
                <Routes>
                    <Route path='/' element={<button>Hello world</button>} />
                    <Route path='/students' element={<StudentList students={students} />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
