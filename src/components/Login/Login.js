import React,{useState} from 'react'
import "./login.scss";
import {useHistory} from "react-router-dom"

import {auth} from "../../firebase";
import { FiberPinTwoTone } from '@material-ui/icons';

export default function Login() {
    const history = useHistory();
    const [email,setEmail] = useState();
    const [password,setPassword] = useState();

    const signin = (e)=>{
        e.preventDefault();
        auth.signInWithEmailAndPassword(email, password)
        .then(
            auth=>{
                history.push("/")
            }
        )
        .catch(err=>{
            alert(err.message)
        });
    }


    const register = (e)=>{
        e.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
        .then(
            auth=>{
                signin(e);
                //history.push("/")
            }
        )
        .catch(err=>{
            alert(err.message)
        });
    }


    return (
        <div className="login">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1000px-Amazon_logo.svg.png" alt="" />
            <form  action="" className="login__form">
                <h1>Sign in</h1>
                <label htmlFor="email">E-mail:</label>
                <input type="text" id="email" value={email} onChange={e=>{setEmail(e.target.value)}}/>

                <label htmlFor="password">Password:</label>
                <input type="password" id="password" value={password} onChange={e=>{setPassword(e.target.value)}}/>

                <button  onClick={signin} type="submit" className="login__form__signin" >Sign In</button>

                <p>
                    Eu minim aliquip velit excepteur ad deserunt laborum excepteur eiusmod consectetur non.
                </p>

                <button onClick={register} type="submit" className="login__form__signup">Create Your Amazon Account</button>
            </form>
        </div>
    )
}
