import React,{useEffect,useState} from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Message from "./Message/Message"
import Footer from './Footer/Footer';
import {useParams} from 'react-router-dom';
import db from '../../firebase';
import firebase from 'firebase';
import userEvent from '@testing-library/user-event';
import {useUserContext} from '../../components/UserContextProvider';

export default function Chat() {
    const user = useUserContext();
    const id = useParams("id").id;
    const [title,setTitle] = useState("");
    const [messages,setMessages] = useState([]);
    
    useEffect(() => {
        const unsubscribe = db.collection("rooms").doc(id).onSnapshot(sp=>{
            setTitle(sp.data().name)
        })

        db.collection("rooms").doc(id).collection("messages").orderBy("timestamp","asc").onSnapshot(sp=>{
            setMessages(sp.docs.map(doc =>{
                return doc.data();
            }))
        })
        return () => {
        }
    }, [id])

    const sendMessage = (msg)=>{
        db.collection("rooms").doc(id).collection("messages").add({
            message:msg,
            sender:user.name,
            senderId:user.id,
            timestamp:firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    
    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src="https://material-ui.com/static/images/avatar/1.jpg"/>
                <div className="chat__header__info">
                    <h2>{title}</h2>
                    <p>{messages.length>1 && new Date(messages[messages.length-1].timestamp?.toDate()).toUTCString()}</p>
                </div>

                <div className="header__right">
                    <IconButton>
                        <SearchIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>

            </div>

            <div className="chat__body">
                {messages.map(m=>{
                    return <Message 
                    currentUserId={user.id}
                    sender={m.sender}
                    senderId={m.senderId}
                    timestamp={new Date(m.timestamp?.toDate()).toUTCString()}
                    message={m.message}/>
                })}
            </div>


            <Footer sendMessage={sendMessage}/>
           
        </div>
    )
}
