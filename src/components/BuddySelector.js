import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserCard from "./UserCard";
import UserFilter from "./UserFilter";

const BuddySelector = ({ connectedUsers, me, handleInviteBuddy }) => {
  const [filter, setFilter] = useState({});
  return (
    <Container>
      <Row>
        <Col>
          <h1>Pick your meal buddy</h1>
        </Col>
      </Row>
      <UserFilter filter={filter} setFilter={setFilter} />
      <Row className="justify-content-center">
        {connectedUsers
          .filter((user) => user.id !== me.id)
          .map((user) => {
            return (
              <Fragment key={user.id}>
                <UserCard user={user} handleInviteBuddy={handleInviteBuddy} />
                <br />
              </Fragment>
            );
          })}
      </Row>
    </Container>
  );
};

export default BuddySelector;
