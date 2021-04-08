import React from "react";
import BuddySelector from "../components/BuddySelector";

const SelectionPage = ({
  me,
  connected,
  userVideo,
  connectedUsers,
  handleInviteBuddy,
  acceptedCall,
  incomingCall,
  acceptCall,
  partnerVideo,
}) => {
  return (
    <div>
      <h4>Hello {me.name}</h4>
      <p>
        You are now online and available for calls. You can call a mealbuddy
        from the list below.
      </p>


      {connected && (
        <>
          <video
            style={{ width: "15rem", height: "15rem", borderRadius: "50%", "object-fit": "cover", border: "0.2rem solid white"}}
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
      {acceptedCall && (
        <video
          style={{ width: "75%", height: "75%" }}
          playsInline
          ref={partnerVideo}
          autoPlay
          name="partnerVideo"
        ></video>
      )}
    </div>
  );
};

export default SelectionPage;
