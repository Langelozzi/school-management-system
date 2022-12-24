import React from 'react'
import { Card } from 'react-bootstrap'
import './Home.css';

export default function Home() {
    return (
        <div className='home text-center'>
            <Card style={{ width: '70rem', margin: 'auto' }}>
                <Card.Title>
                    Welcome to EduTracker
                </Card.Title>
                <Card.Text>
                    A modern day student management system to keep your school organized without a worry
                </Card.Text>
            </Card>
        </div>
    )
}
