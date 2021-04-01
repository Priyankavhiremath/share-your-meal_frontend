import React from 'react'
import { Container } from 'react-bootstrap';

const WelcomePage = () => {
    return (
        <div>
            <Container fluid>
                <div className="row">
                <p>logo</p>
                </div>
                
                <h1>Welcome!</h1>  
                <input placeholder="username"></input>
                <input placeholder="password"></input>
                <button>login</button>
                <button>guest user</button>
            </Container>
        </div>
    )
}

export default WelcomePage;
