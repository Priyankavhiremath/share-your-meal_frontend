import React from 'react'

const CallPage = ({ acceptedCall, partnerVideo, connected, userVideo }) => {
    return (
        <div>
            <h1>Hello from the call page</h1>
            
            {connected && (
                <video
                    style={{ width: "15rem", height: "15rem", borderRadius: "50%", "object-fit": "cover", border: "0.2rem solid white"}}
                    playsInline
                    muted
                    ref={userVideo} //is not displayed
                    autoPlay
                    name="userVideo"
                ></video>
            )}
            {acceptedCall && (
                <video
                style={{ width: "80%", height: "80%" }}
                playsInline
                ref={partnerVideo}
                autoPlay
                name="partnerVideo"
                ></video>)}
        </div>
    )
}

export default CallPage
