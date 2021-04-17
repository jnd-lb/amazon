import React from 'react'
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import SearchIcon from '@material-ui/icons/Search';
import SingleUser from './SingleUser/SingleUser';
import {  IconButton } from '@material-ui/core';
import "./Users.css"
export default function Users({users, showConversations}) {

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
                {users.map(user => (
                    <SingleUser {...user} />
                ))}
            </div>
        </div>
    )
}
