import React, { useEffect } from "react";
import HangUp from "../images/hangup.png";

const CallPage = ({ partnerVideo, userVideo, onCallOngoing, callOngoing, endCall }) => {
  useEffect(() => {
    onCallOngoing();
  }, [onCallOngoing]);
  return (
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
          position: "absolute",
          top: 10,
          left: 10,
        }}
        playsInline
        muted
        ref={userVideo}
        autoPlay
        name="userVideo"
      ></video>
      <img
        src={HangUp}
        alt="End call"
        style={{
          position: "absolute",
          width: "4rem",
          bottom: 10,
          right: 10,
          zIndex: 1,
          filter: "invert(100%)",
          cursor: 'pointer'
        }}
        onClick={endCall}
      />
      <video
        style={{
          width: "100%",
          objectFit: "cover",
          height: "100vh",
          zIndex: -1,
        }}
        playsInline
        ref={partnerVideo}
        autoPlay
        name="partnerVideo"
      ></video>
    </div>
  );
};

export default CallPage;
