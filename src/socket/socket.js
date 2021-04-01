import io from "socket.io-client";

export const connectSocket = (socket) => {
    socket.current = io.connect('http://localhost:8000/')
};

export const displayMe = (socket, setMe) => {
    socket.current.on('myId', (id) => {
        setMe(prevState => {
          return { ...prevState, id: id }
        })
      })
}
 
export const displayUsers = (socket, setConnectedUsers) => {
    socket.current.on('connectedUsers', (users) =>{
        setConnectedUsers(users)
      });
}

export const recevingCall = (socket, setIncomingCall) => {
    socket.current.on('incomingCall', ({from, signal}) => {
        console.log({from})
        setIncomingCall({
          caller: from,
          signal
        })  
      });
};

export const acceptInvite = (socket, peer) => {
    socket.current.on('acceptedCall', signal => {
        peer.signal(signal)
      })
}