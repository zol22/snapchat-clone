import React, { useEffect } from 'react';
import { useSelector } from "react-redux"
import "./Preview.css"
import { resetCameraImage, selectCameraImage } from './features/cameraSlice'
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import { useDispatch } from 'react-redux';
import TextFieldsIcon from '@mui/icons-material/TextFields';
import CreateIcon from '@mui/icons-material/Create';
import NoteIcon from '@mui/icons-material/Note';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import AttachFileIcon from '@mui/icons-material/AttachFile';
import CropIcon from '@mui/icons-material/Crop';
import TimerIcon from '@mui/icons-material/Timer';
import SendIcon from '@mui/icons-material/Send';
import { v4 as uuid } from "uuid"; // generate random Unique ID.
import { db, storage } from './firebase';
import {  ref,  uploadString, getDownloadURL } from "firebase/storage";
import { addDoc, serverTimestamp, collection  } from 'firebase/firestore';
import { selectUser } from './features/appSlice';

function Preview() {

    const cameraImage = useSelector(selectCameraImage)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector(selectUser);


    useEffect(()=> {
        if (!cameraImage){
            navigate("/",{replace: true})
        }
    },[cameraImage,navigate])

    const closePreview = () => {
        dispatch(resetCameraImage())
    }
    const sendPost  = async() => {
       // console.log(user)
        const id = uuid();

        const postRef = ref(storage,`posts/${id}`); // Child reference, reference to a specific file        
    
        // You upload the image to the storage
        const uploadTask = await uploadString(postRef, cameraImage, "data_url")
        //console.log(uploadTask)

        // You download the image from the storage to get the url of the image
        const url = await getDownloadURL(postRef)

        // You save the url plus more info in the firestore collection
        await addDoc(collection(db,"posts"), {
                imageUrl : url,
                username: 'zol',
                read: false,
                profilePic: user.profilePic,
                timestamp: serverTimestamp(),
                })
            
            // navigate to chats
            navigate("/chats",{replace: true})


    /*  This is not working on firebase v9 ??
    uploadTask.on(
    'state_changed', 
    null, 
    (error) => {
        console.log(error);
     }, 
    async () => { 
         getDownloadURL(postRef)
         .then((url) => {
            addDoc(collection(db,"posts"), {
                    imageUrl : url,
                    username: 'zol',
                    read: false,
                
                    timestamp: serverTimestamp(),
                    })
                navigate("/chats",{replace: true})
             }
            )   
        }  
    )
    */
        
    }   

  return (
  <div className="preview">
    <CloseIcon onClick={closePreview} className="preview_close"/>
    <div className="preview_toolbarRight">
        <TextFieldsIcon />
        <CreateIcon />
        <NoteIcon />
        <MusicNoteIcon />
        <AttachFileIcon />
        <CropIcon />
        <TimerIcon />
    </div>
    <img src={cameraImage} alt="" />
    <div onClick={sendPost} className="preview_footer">
        <h2>Send</h2>
        <SendIcon fontSize="small" className="preview_sendIcon"/>
    </div>
  </div>)
}

export default Preview;
