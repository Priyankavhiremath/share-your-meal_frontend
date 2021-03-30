
import React from 'react'

const GuestForm = ({onConnect, onChangeForm}) => {
    return (
        
        <form onSubmit={onConnect} onChange={onChangeForm}>
        <input label="name" name="name" placeholder="name"/>
        <input label="country" name="country" placeholder="country"/>
        <input label="language" name="language" placeholder="language"/>
        <input type="submit"/>
        </form>
        
    )
}

export default GuestForm

