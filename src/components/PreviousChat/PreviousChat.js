import React from 'react'
import "./PreviousChat.css"
import { Avatar } from '@material-ui/core';

export default function PreviousChat({title}) {
    return (
        <div className="previouschat__container">
            <Avatar/>
            <div className="previouschat__container__details">
                <h1>{title}</h1>
                <p>laset message</p>
            </div>
        </div>
    )
}
