import React, { useEffect } from "react";
import BuddySelector from "../components/BuddySelector";
import { useHistory } from "react-router-dom";

const SelectionPage = ({
  me,
  connected,
  userVideo,
  connectedUsers,
  handleInviteBuddy,
  acceptedCall,
  incomingCall,
  acceptCall,
  onLogout

}) => {
  const history = useHistory();

  useEffect(() => {
    if (acceptedCall) {
      history.push("/call");
    }
  }, [history, acceptedCall]);

  console.log({vid: userVideo?.current?.srcObject})

  return (
    <div>
      <h4>Hello {me.name}</h4>
      {console.log(me)}
      <p>
        You are now online and available for calls. You can call a mealbuddy
        from the list below.
      </p>
      <button onClick={onLogout}>Logout</button>

      {connected && (
        <>
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

          {!acceptedCall && (
            <BuddySelector
              connectedUsers={connectedUsers}
              me={me}
              handleInviteBuddy={handleInviteBuddy}
            />
          )}
        </>
      )}

      {incomingCall && !acceptedCall && (
        <div>
          <p>{incomingCall.caller.name} is trying to call you!</p>
          <button onClick={() => acceptCall()}>Yes please!</button>
        </div>
      )}
    </div>
  );
};

export default SelectionPage;
