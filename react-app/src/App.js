import React, { useEffect } from 'react';
import { getAllStudents } from './service/studentService';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';

import Nav from './components/Nav/Nav';
import StudentList from './components/StudentList/StudentList';
import Home from './components/Home/Home';

function App() {
    return (
        <Router>
            <Nav />
            <div className='content'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/students' element={<StudentList />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
