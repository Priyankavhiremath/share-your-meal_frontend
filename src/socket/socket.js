import io from "socket.io-client";

export const connectSocket = (socket) => {
  socket.current = io.connect(process.env.REACT_APP_BACKEND_API_HEROKU);
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
  socket.current.on("close", () => {
    history.push("/");
    window.location.reload();
  });
};
