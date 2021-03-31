import React, {useEffect, useState, useRef} from 'react'
import io from "socket.io-client";
import './styles/App.css';
import GuestForm from "./components/GuestForm"
import UserCard from "./components/UserCard"
import Peer from "simple-peer"




function App() {
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
    socket.current = io.connect('http://localhost:8000/')
    //----------------------------------------------
    socket.current.on('myId', (id) => {
      setMe(prevState => {
        return { ...prevState, id: id }
      })
    })
    //------------------------------------------------
    socket.current.on('connectedUsers', (users) =>{
      setConnectedUsers(users)
    });
    //------------------------------------------------
    socket.current.on('incomingCall', ({from, signal}) => {
      console.log({from})
      setIncomingCall({
        caller: from,
        signal
      })  
    })

  }, [])

  const handleChangeForm = (e) => {
    setMe(prevState => {
      return {...prevState, 
        [e.target.name]: e.target.value
      }
    })
  }

  useEffect(() => {
    if (connected) {
      navigator.mediaDevices.getUserMedia({ audio: true, video: true })
      .then(stream => {
        setStream(stream)
        if (userVideo.current) {
          userVideo.current.srcObject = stream
        }
      })
      .catch(error => {
        // What do you do if the user refuses the connection???
        console.log(error.message)
      })
    }
  }, [connected])

  const handleConnect = (event) => {
    event.preventDefault()
    socket.current.emit('newGuestUser', me)
    setConnected(true)
  }

  const handleInviteBuddy = (id) => {
    // Send Offer To Start Connection
  // socket.on('offer', (socketId, description) => {
  //   socket.to(socketId).emit('offer', socket.id, description);
  // });
    const peer = new Peer({
      initiator: true,
      trickle: false,
      stream
    })

    myPeer.current = peer;

    peer.on('signal', signal => {
      socket.current.emit('callUser',  {
        userToCall: id,
        from: me,
        signal
      })
    })

    peer.on('stream', stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream
      }
    })

    peer.on('error', (err) => {
      console.log(err)
    })

    socket.current.on('acceptedCall', signal => {
      peer.signal(signal)
    })

    console.log('accepting all')
  }

  const acceptCall = () => {
    setAcceptedCall(true);

    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream
    })

    peer.on('signal', signal => {
      socket.current.emit('acceptCall',  {
        userWhoCalled: incomingCall.caller.id,
        signal
      })
    })

    peer.on('stream', stream => {
      if (partnerVideo.current) {
        partnerVideo.current.srcObject = stream
      }
    })

    peer.signal(incomingCall.signal)
  }

  return (
    <div className="App">
    {incomingCall && !acceptedCall && (<div>
      <p>{incomingCall.caller.name} is trying to call you!</p>
      <button onClick={() => acceptCall()}>Yes please!</button>
    </div>)}
    {connected && (
      <video  style={{ width: "15%", height: "15%" }}
              playsInline
              muted
              ref={userVideo}
              autoPlay
              name="userVideo">
      </video>
    )}
    {acceptedCall && (
      <video  style={{ width: "75%", height: "75%" }}
              playsInline
              ref={partnerVideo}
              autoPlay
              name="partnerVideo">
      </video>
    )}
    {!connected? <GuestForm onConnect={handleConnect} onChangeForm={handleChangeForm}/> : 
    <UserCard connectedUsers={connectedUsers} me={me} handleInviteBuddy={handleInviteBuddy} />}
    </div>
  );
}

export default App;
