import React from 'react'
import "./Conversations.css";
import PreviousChat from '../../PreviousChat/PreviousChat';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from 'react-router-dom';

export default function Conversations({ user, conversations,showUsers }) {
    return (
        <div className="conversations">
            <div className="conversations__header">
                <IconButton>
                    <Avatar src={user.picture} />
                </IconButton>
                <div className="conversations__header__right">
                    <IconButton>
                        <DonutLargeIcon />
                    </IconButton>

                    <IconButton onClick={showUsers}>
                        <ChatIcon />
                    </IconButton>

                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

            <div className="conversations__search">
                <div className="conversations__search__container">
                    <SearchIcon />
                    <input placeholder="Look up for new Chat" type="text" />
                </div>
            </div>
            <div className="conversations__chats">

                {conversations.map(pc => (
                    <Link to={`/chat/${pc.id}`}>
                        <PreviousChat key={pc.id} title={pc.data.name} />
                    </Link>
                ))}

            </div>
        </div>
    )
}
