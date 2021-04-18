import React, { useEffect, useState } from 'react'
import "./Chat.css"
import { Avatar, IconButton } from '@material-ui/core';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import SearchIcon from '@material-ui/icons/Search';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Message from "./Message/Message"
import Footer from './Footer/Footer';
import db from '../../firebase';
import firebase from 'firebase';
import { useUserContext } from '../UserContextProvider';
import { useChatContext } from '../ChatContextProvider'

export default function Chat() {
    const user = useUserContext();
    const [chat, setChat] = useChatContext();

    const id = chat.id;
    const [recieveName, setRecieverName] = useState("");
    const [picture, setPicture] = useState("");
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        let unsubscribe;
        if (!id) {
            db.collection("conversations").where("conversers", "array-contains", user.id).onSnapshot(sp => {
                const oldConversation = sp.docs.find(doc => (doc.data().conversers.includes(user.id) && doc.data().conversers.includes(chat.receiver.id)))
                if (oldConversation) {
                    setChat({
                        ...chat,
                        id: oldConversation.id
                    }
                    )

                    db.collection("conversations").doc(oldConversation.id).collection("messages").orderBy("timestamp", "asc").onSnapshot(sp => {
                        setMessages(sp.docs.map(doc => {
                            return doc.data();
                        }))
                    })
                } else {
                    setMessages([])
                }
            })
        } else {
            db.collection("conversations").doc(id).collection("messages").orderBy("timestamp", "asc").onSnapshot(sp => {
                setMessages(sp.docs.map(doc => {
                    return doc.data();
                }))
            })
        }

        setRecieverName(chat.receiver.name)
        setPicture(chat.receiver.picture)

        return (
            () => {

            }
        )
    }, [id, chat.receiver.id])


    const sendMessage = (msg) => {
        if (!id) {
            const conv = db.collection("conversations").add(
                {
                    conversers: [user.id, chat.receiver.id],
                    user1: {
                        id: user.id,
                        name: user.name,
                        picture:user.picture
                    },
                    user2: {
                        id: chat.receiver.id,
                        name: chat.receiver.name,
                        picture:chat.receiver.picture
                    },
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
            ).then(doc =>{
                doc.collection("messages").add({
                    message: msg,
                    sender: user.name,
                    senderId: user.id,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                });
            })

            

            

        } else {
            db.collection("conversations").doc(id).collection("messages").add(
                {
                    message: msg,
                    sender: user.name,
                    senderId: user.id,
                    timestamp: firebase.firestore.FieldValue.serverTimestamp()
                }
            )
            db.collection("conversations").doc(id).update({
                timestamp: firebase.firestore.FieldValue.serverTimestamp()
            });
        }
    }

    return (
        <div className="chat">
            <div className="chat__header">
                <Avatar src={picture} />
                <div className="chat__header__info">
                    <h2>{recieveName}</h2>
                    <p>{messages.length > 1 && new Date(messages[messages.length - 1].timestamp?.toDate()).toUTCString()}</p>
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
                {messages.map(m => {
                    return <Message
                        currentUserId={user.id}
                        sender={m.sender}
                        senderId={m.senderId}
                        timestamp={new Date(m.timestamp?.toDate()).toUTCString()}
                        message={m.message} />
                })}
            </div>

            <Footer sendMessage={sendMessage} />

        </div>
    )
}
