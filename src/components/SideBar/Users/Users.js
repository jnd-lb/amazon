import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import SingleUser from './SingleUser/SingleUser';
import { IconButton } from '@material-ui/core';
import "./Users.css"
import { useChatContext } from "../../ChatContextProvider";
import Receiver from '../../ReceiverType';
import Chat from '../../ChatType';
import { useUserContext } from '../../UserContextProvider'
export default function Users({ users, showConversations }) {

    const [chat, setChat] = useChatContext();
    const user = useUserContext();

    return (
        <div className="users__container">
            <div className="users__header">
                <IconButton onClick={showConversations}>
                    <ArrowBackIcon />
                </IconButton>
            </div>
            <div className="users__search">
                <div className="users__search__container">
                    <SearchIcon />
                    <input placeholder="find a user" type="text" />
                </div>
            </div>
            <div className="user__userslist">
                {users.map(_user => {
                    if (_user.id === user.id) return;
                    return <SingleUser {..._user} onClick={() => {
                        setChat(
                            new Chat(null, new Receiver(_user.name, _user.id, _user.picture))
                        )
                    }} />
                })}
            </div>
        </div>
    )
}
