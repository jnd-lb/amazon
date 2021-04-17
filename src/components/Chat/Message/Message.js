import React from 'react'
import "./Message.css"

export default function Message({message,senderId,sender,timestamp,currentUserId}) {
    return (
        <div className={`message ${senderId==currentUserId && 'message__sended'}`}>
            
            <span className="message__sender">
                {sender}
            </span>
            {message}
            <span className="message__timestamp">
                {timestamp}
            </span>

        </div>
    )
}
