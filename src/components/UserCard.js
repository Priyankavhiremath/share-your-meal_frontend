import React from 'react'
import { FaPhone } from 'react-icons/fa';
import { FaRegUserCircle } from 'react-icons/fa';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import '../styles/UserCard.css';


const UserCard = ({ user, }) => {
    return (
        <div>
            <Card >
                <Card.Header  className="username">
                    <FaRegUserCircle /> {user.name}
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                    <p>calling from {user.country} and speaking {user.language} <br/> is a talker</p>
                    </Card.Text>
                    <Button className="callmebutton shadow" >
                        <FaPhone />
                    </Button>
                </Card.Body>
            </Card>
        </div>
    )
}

export default UserCard
