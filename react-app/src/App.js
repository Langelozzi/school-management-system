import React, { useEffect } from 'react';
import { getAllStudents } from './service/studentService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav/Nav';
import StudentList from './components/StudentList/StudentList';

function App() {
    return (
        <Router>
            <Nav />
            <div className='content'>
                <Routes>
                    <Route path='/' element={<button>Hello world</button>} />
                    <Route path='/students' element={<StudentList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
