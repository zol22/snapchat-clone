import { signInWithPopup } from '@firebase/auth';
import { Button } from '@mui/material';
import React from 'react';
import { useDispatch } from 'react-redux';
import { login } from './features/appSlice';
import { auth, provider } from './firebase';
import "./Login.css"

function Login() {
    const dispatch = useDispatch();

    const signIn = () => {
        signInWithPopup(auth, provider).then((result)=> {
            dispatch(login({
                username: result.user.displayName,
                profilePic: result.user.photoURL,
                id: result.user.uid

            }))
            console.log(result)
        }).catch(error => alert(error.message))
    }


  return (
    <div className="login">
        <div className="login_container">
            <img src="https://pbs.twimg.com/profile_images/1471625412182687760/B5CsS8mK_400x400.jpg" alt="" />
            <Button variant="outlined" onClick={signIn}>Sign In</Button>
        </div>
    </div>
    )
}

export default Login;
