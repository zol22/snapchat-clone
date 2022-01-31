import React, { useRef, useCallback} from 'react';
import Webcam from "react-webcam";
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import { useDispatch } from 'react-redux';
import { setCameraImage } from './features/cameraSlice';
import { useNavigate } from 'react-router-dom';
import "./WebcamCapture.css"

const videoConstraints = {
    width: 250,
    height: 400,
    facingMode: "user",
  }
  
function WebcamCapture() {

    const webcamRef = useRef(null);
    const dispatch = useDispatch()
    const navigate = useNavigate()

    /*  
        It will do the function once and it will save the output of the function
        so that way, when it's called again, it knows what to do w/o the heavy
        weight of doing the whole calculation again.
        If the dependency (webcamRef) changes, you need to render expensive calcultion again.
    */
    const capture = useCallback(()=> {
        const imageSrc = webcamRef.current.getScreenshot();
        dispatch(setCameraImage(imageSrc));
        navigate("/preview")

    },[webcamRef, dispatch,navigate])


  return (
  
  <div className="webcamCapture">
    <Webcam 
        audio={false}
        height={videoConstraints.height}
        ref={webcamRef}
        screenshotFormat="image/jpeg" //base 64 image
        width={videoConstraints.width}
        videoConstraints={videoConstraints}
    />
    <RadioButtonUncheckedIcon 
        className="webcamCapture_button"
        onClick={capture}
        fontSize="large"
    />
 
  </div>
  )
}

export default WebcamCapture;
