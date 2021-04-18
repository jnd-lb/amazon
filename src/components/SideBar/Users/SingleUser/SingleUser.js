import React from 'react'
import './SingleUser.css'

import { Avatar, IconButton } from '@material-ui/core';

export default function SingleUser({ name, id, picture,onClick }) {
    return (
            <div onClick={onClick} className="singleuser__container">
                <Avatar src={picture}/>
                <div className="singleuser__container__name">
                    <h1>{name}</h1>
                </div>
            </div>
    )
}
