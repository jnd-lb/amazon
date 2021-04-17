import React, { useEffect, useState } from 'react'

import "./SideBar.css";
import db from "../../firebase";
import {useUserContext} from '../../components/UserContextProvider';
import Conversations from './Conversations/Conversation';
import Users from './Users/Users';

export default function SideBar() {
    
    const [showUsersList,setShowUsersList] = useState(false);

    const user = useUserContext();
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe1 = db.collection("rooms").onSnapshot(snapshot => {
            setConversations(snapshot.docs.map(doc => (
                {
                    id: doc.id,
                    data: doc.data()
                }
            )
            ))
        })

        const unsubscribe2 = db.collection("users").onSnapshot(sp => {
            const _users = sp.docs.map(doc => ({
                name: doc.data().name,
                userid: doc.id,
                picture: doc.data().picture
            }))
            setUsers(_users);
        });

        return () => {
            unsubscribe1();
            unsubscribe2();
        }
    }, [])



    return (
        (showUsersList)?
        <Users showConversations={()=>{setShowUsersList(false)}} users={users}/>
        :
        <Conversations showUsers={()=>setShowUsersList(true)} user={user} conversations={conversations}/>
    )
}
