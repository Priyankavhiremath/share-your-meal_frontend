
import React, {useEffect, useState, useRef} from 'react'
import './styles/App.css';
import './styles/RegisterForm.css'
import Routing from "./components/Routing"
import Footer from "./components/Footer"
import { connectSocket, displayMe, displayUsers, recevingCall, acceptInvite } from './socket/socket'
import { createPeer, callUser, broadcastVideo, logPeerError, acceptIncomingCall } from './peer/peer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory, } from "react-router-dom"

function App() {
  const history = useHistory()
  const [me, setMe] = useState({})
  const [connected, setConnected] = useState(false)
  const [connectedUsers, setConnectedUsers] = useState([])
  const [incomingCall, setIncomingCall] = useState()
  const [acceptedCall, setAcceptedCall] = useState(false)
  const [stream, setStream] = useState()

  const socket = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const myPeer = useRef();

  useEffect(() => {
    connectSocket(socket);
    //----------------------------------------------
    displayMe(socket, setMe);
    //------------------------------------------------
    displayUsers(socket, setConnectedUsers);
    //------------------------------------------------
    recevingCall(socket, setIncomingCall);
  }, []);

  const handleChangeForm = (e) => {
    setMe((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
  };

  useEffect(() => {
    if (connected) {
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
    }
  }, [connected]);

  const handleConnect = (event) => {
    event.preventDefault();
    socket.current.emit("newGuestUser", me);
    setConnected(true);
    history.push('/select')
  };

  const handleInviteBuddy = (id) => {
    // Send Offer To Start Connection
    const peer = createPeer(myPeer, {
      stream,
      initiator: true,
      trickle: false,
    });
    callUser({ peer, socket, id, me });
    broadcastVideo(peer, partnerVideo);
    logPeerError(peer);
    acceptInvite(socket, peer, setAcceptedCall);
    console.log("accepting call");
  };

  const acceptCall = () => {
    setAcceptedCall(true);
    const peer = createPeer(null, { stream, initiator: false, trickle: false });
    acceptIncomingCall(peer, socket, incomingCall);
    broadcastVideo(peer, partnerVideo);
    peer.signal(incomingCall.signal);
  };

  const endCall = () => {
    console.log("call ending...");
    setAcceptedCall(false)
    // setConnected(true)
    history.push('/select')
    setIncomingCall(false)
  }
  
  console.log(connected);

  return (
    
    <div className="App background full-height">
      <Routing
        me={me}
        connected={connected}
        onConnect={handleConnect}
        onChangeForm={handleChangeForm}
        handleInviteBuddy={handleInviteBuddy}
        acceptCall={acceptCall}
        endCall={endCall}
        connectedUsers={connectedUsers}
        acceptedCall={acceptedCall}
        incomingCall={incomingCall}
        userVideo={userVideo}
        partnerVideo={partnerVideo}
      />
      <Footer />
    </div>
    
  );
}

export default App;
