
import React, {useEffect, useState, useRef} from 'react'
import './styles/App.css';
import './styles/RegisterForm.css'
import Routing from "./components/Routing"
import Footer from "./components/Footer"
import { connectSocket, displayMe, displayUsers, recevingCall, acceptInvite, prepareDisconnection } from './socket/socket'
import { createPeer, callUser, broadcastVideo, logPeerError, acceptIncomingCall } from './peer/peer'
import { login, logout, setAuthHeaders } from "./utils/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useHistory } from "react-router-dom";
import Profile from "./components/Profile"

function App() {
  const history = useHistory()
  const [me, setMe] = useState({})
  const [connected, setConnected] = useState(false)
  const [connectedUsers, setConnectedUsers] = useState([])
  const [callOngoing, setCallOngoing] = useState(false);
  const [incomingCall, setIncomingCall] = useState()
  const [acceptedCall, setAcceptedCall] = useState(false)
  const [stream, setStream] = useState()
  const [credentials, setCredentials] = useState();

  const socket = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const myPeer = useRef();

  console.log({
    connected,
    acceptedCall
  })

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
    prepareDisconnection(socket, history)
    peer.signal(incomingCall.signal);
  };

  const handleCallOngoing= () => {
    setAcceptedCall(false)
    setConnected(false)
    setCallOngoing(true)
  }

  const endCall = () => {
    console.log('Ending call')
  }

  const handleSetCredentials = (e) => {
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [e.target.name]: e.target.value
    }));
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
  };

  useEffect(() => {
    setAuthHeaders() && history.push("/profile");
  }, [history]);


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
        onCallOngoing={handleCallOngoing}
        incomingCall={incomingCall}
        userVideo={userVideo}
        partnerVideo={partnerVideo}
        callOngoing={callOngoing}
        onAuth={handleAuthentication}
        onSetCredentials={handleSetCredentials}
        component={Profile}
        onLogout={handleLogout}
      />
      <Footer />
    </div>
    
  );
}

export default App;
