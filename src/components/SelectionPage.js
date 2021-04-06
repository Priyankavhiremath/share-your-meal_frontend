import React from 'react'

const SelectionPage = ({ me, connected, userVideo }) => {
    
    return (
        <div>
            <h4>Hello {me.name}</h4>
            <p>You are now online and available for calls. You can call a mealbuddy from the list below.</p>

            {connected && (
                <video  style={{ width: "15%", height: "15%" }}
                        playsInline
                        muted
                        ref={userVideo}
                        autoPlay
                        name="userVideo">
                </video>
        )}
        </div>
    )
}

export default SelectionPage
