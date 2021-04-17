import React, { Fragment, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import UserCard from "./UserCard";
import UserFilter from "./UserFilter";

const BuddySelector = ({ connectedUsers, me, handleInviteBuddy }) => {
  const [userFilter, setUserFilter] = useState({});

  const filterUser = (user) => {
    let match = true;
    console.log(user);
    console.log(userFilter);
    if (
      !(
        (userFilter.country && userFilter.country.length) ||
        (userFilter.language && userFilter.language.length) ||
        (userFilter.comStyle && userFilter.comStyle.length)
      )
    ) {
      return true; // When no filters are selected return 'true'
    }

    ///-------------------------- Checking the country Filter--------------------------------------
    if (userFilter.country && userFilter.country.length) {
      if (
        !(userFilter.country.filter((c) => c.value === user.country).length > 0)
      )
        return false; // When country filter selected but does not match return 'false'
    }
    /// ------------------------Checking the Communication Style Filter------------------------------
    if (userFilter.comStyle && userFilter.comStyle.length) {
      if (
        !(
          userFilter.comStyle.filter((c) => c.label === user.comStyle).length >
          0
        )
      )
        return false; // When communication filter selected but does not match return 'false'
    }
    ///--------------------------- Checking the Language Filter--------------------------------------
    if (userFilter.language && userFilter.language.length) {
      // console.log(
      //   userFilter.language.filter(
      //     (lang) =>
      //       user.language.filter((userlang) => userlang.value === lang.value)
      //         .length > 0
      //   ).length > 0
      // );
      if (
        !(
          userFilter.language.filter(
            (lang) =>
              user.language.filter((userlang) => userlang.value === lang.value)
                .length > 0
          ).length > 0
        )
      )
        return false; // When communication filter selected but does not match return 'false'
    }

    return true; // When all the selected filter category matches return 'true'
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Pick your meal buddy</h1>
        </Col>
      </Row>
      <UserFilter filter={userFilter} setFilter={setUserFilter} />
      <Row className="justify-content-center">
        {connectedUsers
          .filter((user) => user.id !== me.id)
          .filter((user) => filterUser(user))
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
