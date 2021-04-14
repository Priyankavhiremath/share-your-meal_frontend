import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserCard from "./UserCard";

const BuddySelector = ({ connectedUsers, me, handleInviteBuddy }) => {
  return (
    <Container >
      <Row>
        <Col>
      <h2>Pick your meal buddy</h2>
      </Col>
      </Row>
      <Row className="justify-content-center">
        
      
        {connectedUsers
          .filter((user) => user.id !== me.id)
          .map((user) => {
            return (
              <Fragment key={user.id}>
                <UserCard user={user} handleInviteBuddy={handleInviteBuddy} />
                {/*{user.name} -{user.country} -{user.language}
                <br />
                <button onClick={() => handleInviteBuddy(user.id)}>
                  Pick me
                </button>
            <br />*/}
                <br />
              </Fragment>
            );
          })}
      
      
      </Row>
    </Container>
  );
};

export default BuddySelector;
