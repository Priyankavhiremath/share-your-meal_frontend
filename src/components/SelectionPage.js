import React, { useEffect } from "react";
import BuddySelector from "../components/BuddySelector";
import { useHistory } from "react-router-dom";
import { Button } from "react-bootstrap";
import { countries } from "country-data";
import ChatWindow from "./ChatWindow";

const SelectionPage = ({
  me,
  connected,
  userVideo,
  connectedUsers,
  handleInviteBuddy,
  acceptedCall,
  incomingCall,
  acceptCall,
  onLogout,
  message,
  messages,
  handleNewMessage,
  setMessage
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
          {incomingCall && !acceptedCall && (
            <div>
              {/*<CallNotification />*/}
              <h4>
                <b>{incomingCall.caller.name}</b> is trying to call you!
              </h4>{" "}
              <p>
                Country:{" "}
                <b>
                  {countries[incomingCall.caller.country] &&
                    countries[incomingCall.caller.country].name}
                </b>{" "}
                <br />
                Language:{" "}
                <b>
                  {incomingCall.caller.language &&
                    incomingCall.caller.language.map(
                      (lang, index) => (index > 0 ? ", " : "") + lang.label
                    )}
                </b>
                <br /> Communication Style:{" "}
                <b>
                  {incomingCall.caller.comStyle && incomingCall.caller.comStyle}
                </b>
              </p>
              {/* from{" "}
                {countries[incomingCall.caller.country] &&
                  countries[incomingCall.caller.country].name}
                <br />
                speaking{" "}
                {incomingCall.caller.language &&
                  incomingCall.caller.language.map((lang) => lang.label + ", ")}
                <br />
                is trying to call you! */}
              <Button className="acceptButton" onClick={() => acceptCall()}>
                Yes please!
              </Button>
              <br />
              <br />
              <Button className="rejectButton">Sorry, no</Button>
            </div>
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
      
      {me && (
        <ChatWindow
          messages={messages}
          message={message}
          setMessage={setMessage}
          onNewMessage={handleNewMessage}
          connectedUsers={connectedUsers}
        />
      )}
    </div>
  );
};

export default SelectionPage;
