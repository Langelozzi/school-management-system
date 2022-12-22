import React from 'react'
import './Nav.css';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export default function Nav() {
    function navigateToStudentsList() {
        window.location = '/students';
    }

    return (
        <nav>
            <Link to="/">
                <img id='nav-logo' src={require('../../images/book-logo.png')} alt='book'></img>
            </Link>
            <div id='nav-btn-container'>
                <Button className='nav-btn' variant='dark' size='lg'>
                    <Link to="/students"> Students </Link>
                </Button>
                <Button className='nav-btn' variant='dark' size='lg'> Courses </Button>
                <Button className='nav-btn' variant='dark' size='lg'> Settings </Button>
            </div>
        </nav>
    )
}
