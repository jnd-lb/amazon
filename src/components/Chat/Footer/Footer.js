import React, { useState } from 'react'
import { IconButton } from '@material-ui/core';
import Emoji from '@material-ui/icons/SentimentVerySatisfied';
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import "./Footer.css";

export default function Footer({sendMessage}) {
    const [message, setMessage] = useState("");

    const _sendMessage = (e)=>{
            e.preventDefault();
            sendMessage(message);
            setMessage("");
    }

    return (
        <div className="footer">
            <IconButton>
                <Emoji />
            </IconButton>
            <form>
            <input max="200" placeholder="Type a message..." type="text" value={message} onChange={(e)=>{ setMessage(e.target.value)}} />
            <button type="submit" onClick={_sendMessage}></button>
            </form>

            {message.length == 0
                ?
                <IconButton>
                    <MicIcon />
                </IconButton>
                :
                <IconButton onClick={_sendMessage}>
                    <SendIcon />
                </IconButton>
            }

        </div>
    )
}
