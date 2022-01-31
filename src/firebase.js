import { initializeApp } from 'firebase/app';
import {getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore} from 'firebase/firestore';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoBy2W620hUgb2dKP4WGATMTwrLC-ZbCc",
  authDomain: "snapchat-clone-b76d6.firebaseapp.com",
  projectId: "snapchat-clone-b76d6",
  storageBucket: "snapchat-clone-b76d6.appspot.com",
  messagingSenderId: "842615308681",
  appId: "1:842615308681:web:5ae23b14abf1d6d859a158",
  measurementId: "G-QZN3FRQ3Z4"
};



  const firebaseApp = initializeApp(firebaseConfig);
  const db = getFirestore(firebaseApp);
  const auth = getAuth();
  const storage = getStorage(firebaseApp);
  const provider = new GoogleAuthProvider();


export { db, auth, storage, provider };