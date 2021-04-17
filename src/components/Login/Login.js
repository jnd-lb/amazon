import React from 'react'
import { Button } from '@material-ui/core';
import "./Login.css";
import { auth, provider } from '../../firebase';
import { useUserContext, useUserUpdateContext } from '../UserContextProvider';
import db from './../../firebase';
export default function Login() {
    const setUser = useUserUpdateContext();


    console.log("user Context", useUserContext())
    const login = () => {
        auth.signInWithPopup(provider)
            .then(result => {
                const user = {
                    name: result.additionalUserInfo.profile.name,
                    picture: result.additionalUserInfo.profile.picture,
                    id: result.additionalUserInfo.profile.id
                }
                setUser(
                    {
                        ...user
                    }
                )
                localStorage.setItem("token", result.credential.accessToken)
                db.collection('users').doc(user.id)
                    .set(
                        {
                            ...user
                        },
                        { merge: true }
                    )

                console.log(">>>", result)
            })
            .catch(err => alert(err.message))
    }
    return (

        <div className="login__body">
            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/1200px-WhatsApp.svg.png" alt="" srcset="" />
            <div className="login__text">
                <h1>Sign in to Whatsapp</h1>
            </div>
            <Button onClick={login}>Sign in with Google</Button>
        </div>
    )
}
