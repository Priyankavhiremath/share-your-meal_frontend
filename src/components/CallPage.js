import React from 'react'

const CallPage = ({ acceptedCall, partnerVideo, connected, userVideo, endCall }) => {
    return (
        <div>
            {connected && (
                <video
                    style={{  
                        width: "15rem", 
                        height: "15rem",
                        borderRadius: "50%", 
                        "object-fit": "cover", 
                        border: "0.2rem solid white",
                        position: "absolute"
                    }}
                    playsInline
                    muted
                    ref={userVideo} //is not displayed
                    autoPlay
                    name="userVideo"
                ></video>
            )}
            {acceptedCall && (
                <video
                style={{ width: "100%", height: "100%", "z-index": "-1"}}
                playsInline
                ref={partnerVideo}
                autoPlay
                name="partnerVideo"
                ></video>)}
            <button
                onClick={endCall}
                type="submit"
                className='purple-button'
                // redirect to /select route
                // stay connected and still display your own video
                // set accepted call to false
                // end partner video
                // rerender selection page so new users are displayed
            >Hang up</button>
        </div>
    )
}

export default CallPage
