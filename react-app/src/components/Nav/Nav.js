import React from 'react'
import './Nav.css';
import Button from 'react-bootstrap/Button';

export default function Nav() {
    return (
        <nav>
            <img id='nav-logo' src={require('../../images/book-logo.png')} alt='book'></img>
            <div id='nav-btn-container'>
                <Button className='nav-btn' variant='dark' size='lg'> Students </Button>
                <Button className='nav-btn' variant='dark' size='lg'> Courses </Button>
                <Button className='nav-btn' variant='dark' size='lg'> Settings </Button>
            </div>
        </nav>
    )
}
