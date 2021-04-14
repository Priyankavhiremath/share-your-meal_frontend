import Peer from "simple-peer"

export const createPeer = (myPeer, { stream, initiator, trickle }) => {
    const peer = new Peer({
        initiator,
        trickle,
        stream
      })
    
      if(myPeer !== null) myPeer.current = peer;

      return peer;
};

export const callUser = ({ peer, socket, id, me }) => {
    peer.on('signal', signal => {
        socket.current.emit('callUser',  {
          userToCall: id,
          from: me,
          signal
        })
      })
}

export const broadcastVideo = (peer, partnerVideo) => {
    peer.on('stream', stream => {
        if (partnerVideo.current) {
          partnerVideo.current.srcObject = stream
        }
      })
}

export const peerError = (peer, endCall) => {
    peer.on('error', (err) => {
        console.log(err)
        endCall()
      })
};

export const acceptIncomingCall = (peer, socket, incomingCall) => {
    peer.on('signal', signal => {
        socket.current.emit('acceptCall',  {
          userWhoCalled: incomingCall.caller.id,
          signal
        })
      })
}

