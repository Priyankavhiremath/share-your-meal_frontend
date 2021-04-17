import io from "socket.io-client";
import serverUrl from "../utils/serverUrl"
import { Howl } from "howler";

const callNotification = new Howl ({
  src: ['/sounds/doorBell.mp3'],
  volume: 0.4
  })

export const connectSocket = (socket) => {
  socket.current = io.connect(serverUrl);
};

export const displayMe = (socket, setMe) => {
  socket.current.on("myId", (id) => {
    setMe((prevState) => {
      return { ...prevState, id: id };
    });
  });
};

export const displayUsers = (socket, setConnectedUsers) => {
  socket.current.on("connectedUsers", (users) => {
    setConnectedUsers(users);
  });
};

export const recevingCall = (socket, setIncomingCall , setUserRejectsCall ) => {
  socket.current.on("incomingCall", ({ from, signal}) => {
    console.log({ from });
    setUserRejectsCall(false);
    callNotification.play();
    setIncomingCall({
      caller: from,
      signal,
    });
  });
};

export const acceptInvite = (socket, peer, setAcceptedCall, dialSignal) => {
  socket.current.on("acceptedCall", (signal) => {
    dialSignal.unload();
    peer.signal(signal);
    setAcceptedCall(true);
  });
};

export const rejectInvite = (socket, setIWasRejected, dialSignal, buddy) => {
  socket.current.on("rejectedCall", ()=>{
    setIWasRejected(true);
    dialSignal.unload();
    socket.current.emit("endCall", buddy ); 
  });
};

export const prepareDisconnection = (socket, history) => {
  console.log('setting up the end call signal!')
  socket.current.on("endCall", () => {
    console.log('received the end call signal!')
    history.push("/");
    window.location.reload();
  });
};

export const userJoined = (socket, addMessage) => {
  socket.current.on(
    "userJoined",
    ({ name }) => {
      addMessage(`${name} has joined the chatroom!`, "Bot");
    }
  );
}

export const newMessage = (socket, addMessage) => {
  socket.current.on("newMessage", ({ from, message, color }) => {
    addMessage(message, from, color);
  });
}

export const userDisconnected = (socket, addMessage) => {
  socket.current.on(
    "userDisconnected",
    ({ name }) => {
      console.log(name)
      addMessage(`${name} has left the chatroom!`, "Bot");
    });
}

export const youJoined = (socket, addMessage) => {
  console.log('setting up you joined function')
  socket.current.on("loginSuccess", () => {
    console.log('logged in')
    addMessage(`You have joined the chatroom!`, "Bot");
  });
}