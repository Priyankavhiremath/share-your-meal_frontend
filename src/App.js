import React, { useEffect, useState, useRef } from "react";
import "./styles/App.css";
import "./styles/RegisterForm.css";
import Routing from "./components/Routing";
import Footer from "./components/Footer";
import {
  connectSocket,
  displayMe,
  displayUsers,
  recevingCall,
  acceptInvite,
  prepareDisconnection,
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
import { v4 as uuidv4 } from "uuid";
import io from "socket.io-client";


function App() {
  const history = useHistory();
  const [me, setMe] = useState({});
  const [connected, setConnected] = useState(false);
  const [connectedUsers, setConnectedUsers] = useState([]);
  const [callOngoing, setCallOngoing] = useState(false);
  const [incomingCall, setIncomingCall] = useState();
  const [acceptedCall, setAcceptedCall] = useState(false);
  const [stream, setStream] = useState();
  const [credentials, setCredentials] = useState();

  const [meMessage, setMeMessage] = useState()
  const [chatRoomInfo, setChatroomInfo] = useState();
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const [buddy, setBuddy] = useState()

  
  const socket = useRef();
  const userVideo = useRef();
  const partnerVideo = useRef();
  const myPeer = useRef();

  // -----------------------message logic------------------------------
  const updateUsersNumber = (number) => {
    setChatroomInfo((prevState) => ({
      ...prevState,
      numberOfConnectedUsers: number,
    }));
  };

  const updateUsers = (usersMessage) => {
    setChatroomInfo((prevState) => ({ ...prevState, usersMessage }));
  };

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
    addMessage(message, "meMessage");
    socket.current.emit("newMessage", message);
    setMessage("");
  };

  useEffect(() => {
    if (meMessage) {
      socket.current = io.connect("http://localhost:8000/");
      console.log(meMessage);

      socket.current.emit("newUser", { username: meMessage });

      socket.current.on("loginSuccess", ({ numberOfConnectedUsers, usersMessage }) => {
        addMessage(`You have joined the chatroom!`, "Bot");
        updateUsersNumber(numberOfConnectedUsers);
        updateUsers(usersMessage);
      });

      socket.current.on(
        "userJoined",
        ({ numberOfConnectedUsers, usersMessage, username }) => {
          addMessage(`${username} has joined the chatroom!`, "Bot");
          updateUsersNumber(numberOfConnectedUsers);
          updateUsers(usersMessage);
        }
      );

      socket.current.on("newMessage", ({ from, message, color }) => {
        addMessage(message, from, color);
      });

      socket.current.on(
        "userDisconnected",
        ({ username, usersMessage, numberOfConnectedUsers }) => {
          addMessage(`${username} has left the chatroom!`, "Bot");
          updateUsersNumber(numberOfConnectedUsers);
          updateUsers(usersMessage);
        }
      );
    }
  }, [meMessage]);


  // -----------------------video logic------------------------------

  useEffect(() => {
    connectSocket(socket);
    //----------------------------------------------
    displayMe(socket, setMe);
    //------------------------------------------------
    displayUsers(socket, setConnectedUsers);
    //------------------------------------------------
    recevingCall(socket, setIncomingCall);
    //------------------------------------------------
    prepareDisconnection(socket, history);
  }, []);

  const handleChangeForm = (e) => {
    setMe((prevState) => {
      return { ...prevState, [e.target.name]: e.target.value };
    });
    setMeMessage(username)
    console.log(username)
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
    setBuddy(id)
    callUser({ peer, socket, id, me });
    broadcastVideo(peer, partnerVideo);
    peerError(peer, endCall);
    acceptInvite(socket, peer, setAcceptedCall);
    console.log("accepting call");
  };

  const acceptCall = () => {
    setAcceptedCall(true);
    const peer = createPeer(null, { stream, initiator: false, trickle: false });
    acceptIncomingCall(peer, socket, incomingCall);
    broadcastVideo(peer, partnerVideo);
    peerError(peer, endCall);
    peer.signal(incomingCall.signal);
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
  };

  useEffect(() => {
    setAuthHeaders() && history.push("/profile");
  }, [history]);

  return (
    <div className="App background full-height">
      <div className="main">
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
          onLogout={handleLogout}
          username={username}
          setUsername={setUsername}
          setMe={setMe}
          chatRoomInfo={chatRoomInfo}
          messages={messages}
          message={message}
          setMessage={setMessage}
          handleNewMessage={handleNewMessage}
          meMessage={meMessage}
          setMeMessage={setMeMessage}
          />
      </div>
      <Footer />
    </div>
  );
}

export default App;
