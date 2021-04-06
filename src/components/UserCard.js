import React from 'react'

const UserCard = ({connectedUsers, me, handleInviteBuddy}) => {

    return (
        <div>
            <h1>Pick your meal buddy</h1>  
            <p>{connectedUsers.filter(user => user.id !== me.id).map(user => {
            return <>
            {user.name} - 
            {user.country} - 
            {user.language}
            <br />
            
            <button onClick={() => handleInviteBuddy(user.id)} >Pick me</button>
            <br />
            <br />
            <br />
            </>
            })}</p>
        </div>
    )
}

export default UserCard
