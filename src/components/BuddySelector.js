import React, { Fragment } from "react";
import UserCard from "./UserCard";

const BuddySelector = ({ connectedUsers, me, handleInviteBuddy }) => {
  return (
    <div>
      <h1>Pick your meal buddy</h1>
      <p>
        {connectedUsers
          .filter((user) => user.id !== me.id)
          .map((user) => {
            return (
              <Fragment key={user.id}>
                <UserCard user={user} />
                {user.name} -{user.country} -{user.language}
                <br />
                <button onClick={() => handleInviteBuddy(user.id)}>
                  Pick me
                </button>
                <br />
                <br />
                <br />
              </Fragment>
            );
          })}
      </p>
    </div>
  );
};

export default BuddySelector;
