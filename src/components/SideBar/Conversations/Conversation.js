import React from 'react'
import "./Conversations.css";
import PreviousChat from '../../PreviousChat/PreviousChat';
import { Avatar, IconButton } from '@material-ui/core';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import { useChatContext } from '../../ChatContextProvider'
import Chat from "../../ChatType";
import Receiver from "../../ReceiverType";

export default function Conversations({ user, conversations, showUsers }) {

    const [chat, setChat] = useChatContext()
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

                {conversations.map(c => (
                    <PreviousChat
                        onClick={() => {
                            setChat(
                                new Chat(c.id,new Receiver(c.user.name,c.user.id,c.user.picture))
                            )
                        }} key={c.id} title={c.user.name} picture={c.user.picture} />
                ))}

            </div>
        </div>
    )
}
