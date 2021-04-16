import React from "react";
import { FaPhone } from "react-icons/fa";
import { FaRegUserCircle } from "react-icons/fa";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/UserCard.css";
import { countries } from "country-data";

const UserCard = ({ user, handleInviteBuddy }) => {
  return (
    <div>
      <Card className="usercard" style={{ width: "20rem" }}>
        <Card.Header className="username">
          <FaRegUserCircle size="2rem" /> {user.name}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <p>
              Country:{" "}
              <b>{countries[user.country] && countries[user.country].name}</b>{" "}
              <br />
              Language:{" "}
              <b>
                {user.language &&
                  user.language.map(
                    (lang, index) => (index > 0 ? ", " : "") + lang.label
                  )}
              </b>
              <br /> Communication Style:{" "}
              <b>{user.comStyle && user.comStyle}</b>
            </p>
          </Card.Text>
          <Button
            className="callmebutton shadow"
            onClick={() => handleInviteBuddy(user.id)}
          >
            <FaPhone />
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserCard;
