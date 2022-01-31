import React from 'react';
import "./Chat.css"
import { Avatar } from '@mui/material';
import StopRoundedIcon from '@mui/icons-material/StopRounded';
import ReactTimeago from 'react-timeago'; // react time ago, package
import { useDispatch } from 'react-redux';
import { selectImage } from './features/appSlice';
import { doc, setDoc } from '@firebase/firestore';
import { db } from './firebase';
import { useNavigate } from 'react-router';


function Chat({ id, username, timestamp, read, imageUrl, profilePic}) {

    const dispatch = useDispatch();
    const navigate = useNavigate();


   const open = () => {
       // if true
       console.log("before the if condition "+ read)
       console.log("!read is equal to " + !read)
       
       if (!read) {
           dispatch(selectImage(imageUrl));

           const postRef = doc(db,"posts", id);
           setDoc(postRef, { // overwrite , set read to true
               read:true
           }, { 
               merge: true // data is merged into the existing document; dont overwrite the whole document
           })
           navigate('/chats/view')
       }
   }
    return (
  <div className="chat" onClick={open}>
    <Avatar className="chat_avatar" src={profilePic}/>
    <div className="chat_info">
        <h4>{username}</h4>
        <p>
            { !read && "Tap to view - "} {" "}
            <ReactTimeago date={new Date(timestamp?.seconds * 1000).toUTCString()} /> 
        </p>
    </div>
    {!read && <StopRoundedIcon className="chat_readIcon"/>}
  </div>
  )
}

export default Chat;
