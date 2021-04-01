
import React from 'react'

const GuestForm = ({onConnect, onChangeForm, connected, userVideo}) => {
    return (
        <>
        <h1>Enter your info</h1>
        <form onSubmit={onConnect} onChange={onChangeForm}>
        <input label="name" name="name" placeholder="name"/>
        <input label="country" name="country" placeholder="country"/>
        <input label="language" name="language" placeholder="language"/>
        <input type="submit"/>
        </form>

        {connected && (
        <video  style={{ width: "15%", height: "15%" }}
                playsInline
                muted
                ref={userVideo}
                autoPlay
                name="userVideo">
        </video>
        )}
    </>
    )
}

export default GuestForm

