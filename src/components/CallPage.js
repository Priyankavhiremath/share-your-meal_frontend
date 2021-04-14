import React, { useEffect, useState } from "react";
import HangUp from "../images/hangup.png";
import ProgressBar from "react-bootstrap/ProgressBar";
import LastMinuteMessage from "./LastMinuteMessage";

const CallPage = ({ partnerVideo, userVideo, onCallOngoing, callOngoing, endCall }) => {
  const [callProgress, setCallProgress] = useState(0);
  const [isLastMinute, setIsLastMinute] = useState(false);
  const [timeIsUp, setTimeIsUp] = useState(false);

  useEffect(()=>{
    const interval = setInterval(()=>{
      setCallProgress((progress)=>progress+1);
    }, 1200); 
    return () => clearInterval(interval);
  },[]);

  useEffect(()=>{
    if (callProgress >= 50 )
    setIsLastMinute(true);
  }, [callProgress]);

  useEffect(()=>{
    if (callProgress === 100)
    endCall();
  }, [callProgress]);

  useEffect(() => {
    onCallOngoing();
  }, [onCallOngoing]);

  return (
    <div>
      <ProgressBar className="custom-progress" variant="warning" now={callProgress} />
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
          top: 50,
          left: 20,
        }}
        playsInline
        muted
        ref={userVideo}
        autoPlay
        name="userVideo"
      ></video>
      { isLastMinute && (
        <div>
        <audio src="/sounds/lastMinuteBell.mp3">
       </audio>
        <LastMinuteMessage />
        </div>
      )}
      
      <img
        src={HangUp}
        alt="End call"
        style={{
          position: "absolute",
          width: "4rem",
          bottom: 100,
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
