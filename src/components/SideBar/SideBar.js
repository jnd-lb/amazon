import React, { useEffect, useState } from 'react'

import "./SideBar.css";
import db from "../../firebase";
import { useUserContext } from '../../components/UserContextProvider';
import Conversations from './Conversations/Conversation';
import Users from './Users/Users';

export default function SideBar() {

    const [showUsersList, setShowUsersList] = useState(false);

    const user = useUserContext();
    const [conversations, setConversations] = useState([]);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const unsubscribe1 = db.collection("conversations").where("conversers", "array-contains", user.id).onSnapshot(snapshot => {
            setConversations(snapshot.docs.map(doc => {
                return {
                    id: doc.id,
                    user: (doc.data().user1.id != user.id)?doc.data().user1 :doc.data().user2 , // the data of the other member in a conversation
                }
            
            }
            ))
        })

        const unsubscribe2 = db.collection("users").onSnapshot(sp => {
            const _users = sp.docs.map(doc => ({
                name: doc.data().name,
                id: doc.id,
                picture: doc.data().picture
            }))
            setUsers(_users);
        });

        return () => {

        }
    }, [conversations])



    return (
        (showUsersList) ?
            <Users showConversations={() => { setShowUsersList(false) }} users={users} />
            :
            <Conversations showUsers={() => setShowUsersList(true)} user={user} conversations={conversations} />
    )
}
