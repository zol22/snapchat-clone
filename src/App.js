import React, { useEffect } from 'react';
import './App.css';
import WebcamCapture from './WebcamCapture';
import {
  BrowserRouter,
  Routes,
  Route,
  Outlet
} from "react-router-dom";

import Preview from './Preview';
import Chats from './Chats';
import ChatView from './ChatView';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout, selectUser } from './features/appSlice';
import Login from './Login';
import { auth } from './firebase';
import { onAuthStateChanged } from '@firebase/auth';

function App() {

 const user = useSelector(selectUser);
  const dispatch = useDispatch();

  /* Login persistance */
  useEffect(() => {
    onAuthStateChanged(auth, (userAuth) => {
      if( userAuth) {
        dispatch(login({
          username: userAuth.displayName,
          profilePic: userAuth.photoURL,
          id: userAuth.uid,
        }))
      } else {
        dispatch(logout())
      }

    })
  })

 

  return (
    <div className="app">
    <BrowserRouter>

    {!user ? (
      <Login />
    ): (
      <>
      <img className="app_logo" src="https://pbs.twimg.com/profile_images/1471625412182687760/B5CsS8mK_400x400.jpg" alt="" />
      <div className="app_body">
        <div className="app_bodyBackground">
          <Routes>

          <Route path="/" element={<WebcamCapture/>} />
          <Route path="preview" element={<Preview/>}/>

          <Route path="chats" element={<Outlet/>}>
            <Route index element={<Chats />} />
            <Route path="view" element={<ChatView />} />
          </Route>

        </Routes>
        </div>
 
      </div>
      </>
    )}
      
    </BrowserRouter>
    
    </div>
  );
}

export default App;
