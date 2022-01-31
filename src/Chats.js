import React, { useEffect, useState } from 'react';
import "./Chats.css"
import { Avatar } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import { collection, onSnapshot, orderBy, query } from '@firebase/firestore';
import { db } from './firebase';
import Chat from './Chat';
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { selectUser } from './features/appSlice';
import { auth } from './firebase';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { resetCameraImage } from './features/cameraSlice';




function Chats() {

  const [posts, setPosts] = useState([])
  const user = useSelector(selectUser)
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Listener to the firestore collection
  useEffect(()=> {
    const q = query(collection(db,"posts"), orderBy('timestamp', 'desc'))
    onSnapshot(q,(snapshot) => {
      setPosts(snapshot.docs.map(doc =>({
        id: doc.id,
        data: doc.data()
      })))
    })
  }, [])

  const takeSnap = () => {
    dispatch(resetCameraImage())
    navigate("/")
  }

  return (

  <div className="chats">
  <Outlet />
        
        <div className="chats_header">
            <Avatar src={user.profilePic} onClick={() => auth.signOut()} className="chats_avatar"/>
            <div className="chats_search">
                <SearchIcon className="chats_searchIcon"/>
                <input placeholder="Friends" type="text" />
            </div>
            <ChatBubbleIcon className="chats_chatIcon"/>
        </div>

        <div className="chats_posts">
          {posts.map(({ id, data: {profilePic, username, timestamp, imageUrl, read }}) => (
            <Chat 
              key={id}
              id={id}
              username={username}
              timestamp={timestamp}
              imageUrl={imageUrl}
              read={read}
              profilePic={profilePic}
            />
          ))}
        </div>

        <RadioButtonUncheckedIcon 
        className="chats_takePicIcon"
        onClick={takeSnap}
        fontSize="large"
    />
        
  </div>
  )
}

export default Chats;
