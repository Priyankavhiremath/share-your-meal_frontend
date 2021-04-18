import React, { useEffect, useState, useRef } from "react";
import "./styles/App.css";
import "./styles/RegisterForm.css";
import Routing from "./components/Routing";
import {
  connectSocket,
  displayMe,
  displayUsers,
  recevingCall,
  acceptInvite,
  rejectInvite,
  prepareDisconnection,
  youJoined,
  userJoined,
  newMessage,
  userDisconnected
} from "./socket/socket";
import {
  createPeer,
  callUser,
  broadcastVideo,
  peerError,
  acceptIncomingCall,
} from "./peer/peer";
import { login, logout, setAuthHeaders } from "./utils/auth";
import "bootstrap/dist/css/bootstrap.min.css";
import { useHistory } from "react-router-dom";
import { Howl } from "howler";
import { v4 as uuidv4 } from "uuid";

function App() {
  const history = useHistory();
  const [me, setMe] = useState({});
  const [connected, setConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [callOngoing, setCallOngoing] = useState(false);
  const [incomingCall, setIncomingCall] = useState();
  const [acceptedCall, setAcceptedCall] = useState(false);
  const [userRejectsCall,setUserRejectsCall] = useState(false);
  const [iWasRejected, setIWasRejected] = useState(false);
  const [invitingBuddy, setInvitingBuddy] = useState(false);
  const [stream, setStream] = useState();
  const [credentials, setCredentials] = useState();
  const [buddy, setBuddy] = useState()
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  
  const socket = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const myPeer = useRef();

  //---------------------------Chat logic----------------------------------------
  const addMessage = (
    text,
    from,
    color,
    date = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  ) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        id: uuidv4(),
        text,
        from,
        date,
        color,
      },
    ]);
  };

  const handleNewMessage = (e) => {
    e.preventDefault();
    addMessage(message, "me");
    socket.current.emit("newMessage", message);
    setMessage("");
  };

  const dialSignal = new Howl({
    src: ['/sounds/nightCrickets.mp3'],
    volume: 0.6,
    loop: true,
  })

  useEffect(() => {
    //------------------------------------------------
    connectSocket(socket);
    //----------------------------------------------
    displayMe(socket, setMe);
    //------------------------------------------------
    displayUsers(socket, setConnectedUsers);
    //------------------------------------------------
    recevingCall(socket, setIncomingCall, setUserRejectsCall);
    //------------------------------------------------
    prepareDisconnection(socket, history);
    //------------------------------------------------
    setAuthHeaders() && history.push("/profile");

    //-----------------CHAT-----------------------
    youJoined(socket, addMessage)
    userJoined(socket, addMessage)
    newMessage(socket, addMessage)
    userDisconnected(socket, addMessage)
  }, [history]);

  const handleChangeForm = (e) => {
    setMe((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ audio: true, video: true })
      .then((stream) => {
        setStream(stream);
        if (userVideo.current) {
          userVideo.current.srcObject = stream;
        }
      })
      .catch((error) => {
        // What do you do if the user refuses the connection???
        console.log(error.message);
      });
  }, [connected]);

  const handleConnect = (event) => {
    event.preventDefault();
    socket.current.emit("newGuestUser", me);
    setConnected(true);
    history.push("/select");
  };

  const handleInviteBuddy = (id) => {
    // Send Offer To Start Connection
    const peer = createPeer(myPeer, {
      stream,
      initiator: true,
      trickle: false,
    });
    setIWasRejected(false);
    setBuddy(id);
    setInvitingBuddy(true);
    callUser({ peer, socket, id, me });
    dialSignal.play();
    broadcastVideo(peer, partnerVideo);
    peerError(peer, endCall);
    rejectInvite(socket, setIWasRejected, dialSignal);
    acceptInvite(socket, peer, setAcceptedCall, dialSignal);
    console.log("accepting call");
  };


  const cancelCall = () =>{

    myPeer.current && myPeer.current.destroy();
    socket.current.emit("cancelCall", buddy );
    dialSignal.unload();
    setInvitingBuddy(false);
    console.log("trying to cancel")
  };

  const acceptCall = () => {
    setAcceptedCall(true);
    const peer = createPeer(null, { stream, initiator: false, trickle: false });
    acceptIncomingCall(peer, socket, incomingCall);
    broadcastVideo(peer, partnerVideo);
    peerError(peer, endCall);
    peer.signal(incomingCall.signal);
  };

  const rejectCall = () => {
    if (incomingCall) {
      console.log('I will reject the call');
    setUserRejectsCall(true);
    socket.current.emit("rejectCall", 
    incomingCall.caller.id );
    } 
  };

  const handleCallOngoing = () => {
    setAcceptedCall(false);
    setConnected(false);
    setCallOngoing(true);
  };

  const endCall = () => {
    myPeer.current && myPeer.current.destroy()
    if (incomingCall) {
      // console.log(`I am the at the receiving end. sending the end call signal to the caller: ${incomingCall && incomingCall.caller.id}`)
      // console.log(socket.current)
      socket.current.emit('endCall', incomingCall.caller.id);
    } else {
      // console.log(`I am the one calling. sending the end call signal to my buddy: ${incomingCall && incomingCall.caller.id}`)
      socket.current.emit('endCall', buddy);
    }

    history.push("/");
    window.location.reload();
  };

  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => {
      return {
        ...prevCredentials,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleAuthentication = async () => {
    const isAuthenticated = await login(credentials);
    if (isAuthenticated) {
      history.push("/profile");
    } else {
      alert("Wrong credentials");
    }
  };

  const handleLogout = () => {
    logout();
    history.push("/");
    window.location.reload();
  };

  return (
    <div className="App background full-height">
      <div className="main">
        <Routing
          me={me}
          connected={connected}
          onConnect={handleConnect}
          onChangeForm={handleChangeForm}
          handleInviteBuddy={handleInviteBuddy}
          cancelCall={cancelCall}
          acceptCall={acceptCall}
          rejectCall={rejectCall}
          endCall={endCall}
          connectedUsers={connectedUsers}
          acceptedCall={acceptedCall}
          onCallOngoing={handleCallOngoing}
          incomingCall={incomingCall}
          userVideo={userVideo}
          partnerVideo={partnerVideo}
          callOngoing={callOngoing}
          userRejectsCall={userRejectsCall}
          iWasRejected={iWasRejected}
          onAuth={handleAuthentication}
          onSetCredentials={handleSetCredentials}
          onLogout={handleLogout}
          setMe={setMe}
          buddy={buddy}
          invitingBuddy={invitingBuddy}
          message={message}
          messages={messages}
          handleNewMessage={handleNewMessage}
          setMessage={setMessage}
          />
      </div>
    </div>
  );
}

export default App;
