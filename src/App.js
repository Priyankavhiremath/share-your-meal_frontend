import React, {useEffect, useState, useRef} from 'react'
import io from "socket.io-client";
import './styles/App.css';
import GuestForm from "./components/GuestForm"

function App() {
  const [me, setMe] = useState({})
  const [connected, setConnected] = useState(false)
  const [connectedUsers, setConnectedUsers] = useState([])

  const socket = useRef()

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
    })
  }, [])

  const handleChangeForm = (e) => {
    setMe(prevState => {
      return {...prevState, 
        [e.target.name]: e.target.value
      }
    })
  }

  const handleConnect = (event) => {
    event.preventDefault()
    socket.current.emit('newGuestUser', me)
    setConnected(true)
  }

  return (
    <div className="App">
    <h1>SOMETHING</h1>
    {!connected? <GuestForm onConnect={handleConnect} onChangeForm={handleChangeForm}/> : 
    
    (
      <>
      <div>
      {me.name} - {me.country} - {me.language}
      </div>
      <br />
      {connectedUsers.filter(user => user.id !== me.id).map(user => {
        return <>{user.name} - {user.country} - {user.language}</>
      })}
      </>

    )
    
    
    }
    
    </div>
  );
}

export default App;
