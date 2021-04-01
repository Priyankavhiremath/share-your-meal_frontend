import React from 'react'
import {Link} from 'react-router-dom'
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
                <Link to="/guest">
                    <button>guest user</button>
                </Link>
            </Container>
        </div>
    )
}

export default WelcomePage;
