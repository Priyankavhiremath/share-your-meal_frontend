import React, {useEffect, useState, useRef} from 'react'
import io from "socket.io-client";
import './App.css';

function App() {
  const [me, setMe] = useState({})

  const socket = useRef()

  useEffect(() => {
    socket.current = io.connect('http://localhost:3000/')
    socket.current.on('myId', (id) => {
      setMe(prevState => {
        return { ...prevState, id: id }
      })
    })
  }, [])

  const handleChange = (e) => {
    setMe(prevState => {
      return {...prevState, 
        [e.target.name]: e.target.value
      }
    })
  }

  return (
    <div className="App">
    <h1>SOMETHING</h1>
    <form onChange={handleChange}>
    <input label="name" name="name" placeholder="name"/>
    <input label="country" name="country" placeholder="country"/>
    <input label="language" name="language" placeholder="language"/>
    <input type="submit"/>
    </form>

    </div>
  );
}

export default App;
