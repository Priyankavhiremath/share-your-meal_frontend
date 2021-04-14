import io from "socket.io-client";
import serverUrl from "../utils/serverUrl"

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

export const recevingCall = (socket, setIncomingCall) => {
  socket.current.on("incomingCall", ({ from, signal }) => {
    console.log({ from });
    setIncomingCall({
      caller: from,
      signal,
    });
  });
};

export const acceptInvite = (socket, peer, setAcceptedCall) => {
  socket.current.on("acceptedCall", (signal) => {
    peer.signal(signal);
    setAcceptedCall(true);
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
