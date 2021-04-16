import React, { useEffect } from "react";
import BuddySelector from "../components/BuddySelector";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import CallNotification from "./CallNotification";
import { countries } from "country-data";

const SelectionPage = ({
  me,
  connected,
  userVideo,
  connectedUsers,
  handleInviteBuddy,
  acceptedCall,
  incomingCall,
  acceptCall,
  rejectCall,
  userRejectsCall,
  onLogout,
}) => {
  const history = useHistory();

  useEffect(() => {
    if (acceptedCall) {
      history.push("/call");
    }
  }, [history, acceptedCall]);

  console.log({ vid: userVideo?.current?.srcObject });

  return (
    <div>
      <h1>Hello {me.name}</h1>
      {console.log(me)}
      <p>
        You are now online and available for calls. You can call a mealbuddy
        from the list below or{" "}
        <Button className="roundButton" onClick={onLogout}>
          Logout
        </Button>
        <br />
      </p>
      {connected && (
        <div>
          <video
            style={{
              width: "15rem",
              height: "15rem",
              borderRadius: "50%",
              objectFit: "cover",
              border: "0.2rem solid white",
              transform: "rotateY(180deg)",
              WebkitTransform: "rotateY(180deg)",
            }}
            playsInline
            muted
            ref={userVideo}
            autoPlay
            name="userVideo"
          ></video>
          {incomingCall && !acceptedCall && !userRejectsCall && (
            <div>
              <h4>
                {incomingCall.caller.name} <br />
                from{" "}
                {countries[incomingCall.caller.country] &&
                  countries[incomingCall.caller.country].name}
                <br />
                speaking{" "}
                {incomingCall.caller.language &&
                  incomingCall.caller.language.map((lang) => lang.label + ", ")}
                <br />
                is trying to call you!
              </h4>
              <Button className="acceptButton" onClick={() => acceptCall()}>
                Yes please!
              </Button>
              <br />
              <br />
              <Button className="rejectButton" onClick={()=> rejectCall()}>Sorry, no</Button>
            </div>
          )}
          {userRejectsCall && (
            <h4>`Sorry, {incomingCall.caller.name} has no time for you`</h4>
          )}
          {!acceptedCall && (
            <BuddySelector
              connectedUsers={connectedUsers}
              me={me}
              handleInviteBuddy={handleInviteBuddy}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default SelectionPage;
