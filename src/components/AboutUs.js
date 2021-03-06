import React from "react";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Card, CardGroup } from "react-bootstrap";
import Footer from "./Footer";
import { Button, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const AboutUs = () => {
  return (
    <React.Fragment>
      <Container fluid className="main">
      <Row className="justify-content-center">
      <h1 className="mt-5 mb-3">Meet our team</h1>
      </Row>
      <br />
      <Row className=" justify-content-center">
      {/*<CardGroup className="ml-5 mr-5 mb-5" >*/}
        <Card className="ml-5 mr-5 mb-5 shadow"  style={{minWidth: '250px', maxWidth:'350px'}}>
          <Card.Img
            variant="top"
            src="./img/selma.jpg"
            height="250px"
            style={{objectFit: 'cover'}}
          />
          <Card.Body>
            <Card.Title>Selma</Card.Title>
            <Card.Text>
              My name is Selma, I’m a Junior Web Developer living in Munich,
              Germany. I studied Aviation Engineering, but ever since high
              school was curious about programming. Attending WBS Coding School
              was one of the best decisions of my life! I love to create new
              programs and enjoy being the part of IT community.
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="ml-5 mr-5 mb-5 shadow" xl={4} style={{minWidth: '250px', maxWidth:'350px'}}>
          <Card.Img
            variant="top"
            src="./img/yuki.jpg"
            height="250px"
            style={{objectFit: 'cover'}}
          />
          <Card.Body>
            <Card.Title>Yuki</Card.Title>
            <Card.Text>
              When I was young I wanted to save the world and studied physics –
              but then decided to save the neighbourhood , and ran my own café
              for 16 years. Still, my interest in technology never left me, so
              in late 2020 I followed my desire to do more technical work again
              and enrolled in a coding bootcamp at the WBS Coding School.{" "}
            </Card.Text>
          </Card.Body>
        </Card>
        <Card className="ml-5 mr-5 mb-5 shadow" xl={4} style={{minWidth: '250px', maxWidth:'350px'}}>
          <Card.Img
            variant="top"
            src="./img/priyanka.jpg"
            height="250px"
            style={{objectFit: 'cover'}}
          />
          <Card.Body>
            <Card.Title>Priyanka</Card.Title>
            <Card.Text>
              I have always had a passion for the web and all things digital but
              also had a fear for coding. So I started learning coding in order
              to overcome this fear and have been enjoying it thoroughly. I am
              so excited to see what the future holds!
            </Card.Text>
          </Card.Body>
        </Card>
      {/*</CardGroup>*/}
      </Row>
      <a href="https://www.zapsplat.com">
        Sound effects obtained from zapsplat.com
      </a>
      <br /> <br />
      <Button className="roundButton mr-4 shadow" href="/">
        {" "}
        Go back{" "}
      </Button>
      <Link to="/guest">
        <Button className="roundButton ml-4 shadow">Start as guest</Button>
      </Link>
      <br /> <br />
      
      </Container>
      <Footer />
    </React.Fragment>
  );
};

export default AboutUs;
