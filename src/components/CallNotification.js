import React from 'react';
import {Howl, Howler} from "howler";

const CallNotification = () => {
const callNotification = new Howl ({
    src: ['/sounds/doorBell.mp3'],
    volume: 0.4
     })

    return (
        <div>
            {callNotification.play()}
        </div>
    )
}

export default CallNotification
