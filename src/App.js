//import logo from './logo.svg';
import './App.css';
import React,{useRef} from 'react'
import * as tf from '@tensorflow/tfjs';
import * as handpose from '@tensorflow-models/handpose';
import Webcam from 'react-webcam';
import { webcam } from '@tensorflow/tfjs-data';
import { drawhand } from './utilities';
import photo1 from './tf-icon.png'
import photo2 from './react.png'

function App() {
  const webcamRef= useRef(null);
  const canvasRef=useRef(null);
  const runHandpose = async () =>{
    const net= await handpose.load()
    console.log('Handpose Model loaded.')

    //loop
    setInterval(()=>{
      detect(net);
    },100);

  };
  const detect= async (net) =>{
    if (
      typeof webcamRef.current!=='undefined' && 
      webcamRef.current!== null && 
      webcamRef.current.video.readyState === 4
    ){
      const video=webcamRef.current.video;
      const videoWidth=webcamRef.current.video.videoWidth;
      const videoHeight=webcamRef.current.video.videoHeight;

      webcamRef.current.video.width=videoWidth;
      webcamRef.current.video.height=videoHeight;
      //canvas
      canvasRef.current.width=videoWidth;
      canvasRef.current.height=videoHeight;
      // detections
      const hand= await net.estimateHands(video)
      console.log(hand)
      //drawhand
      const ctx=canvasRef.current.getContext("2d");
      drawhand(hand,ctx);


    }

  }
  runHandpose();

  return (
    <div className="App">
      <header className="App-header">
       <Webcam ref={webcamRef}
         style={{
           position:'absolute',
           marginLeft:"auto",
           marginRight:"auto",
           left:0,
           right:0,
           textAlign:"center",
           zindex:9,
           width:640,
           height:480,
           borderRadius: '16px',

         }} />
         <canvas ref={canvasRef}
         style={{
           position:'absolute',
           marginLeft:"auto",
           marginRight:"auto",
           left:0,
           right:0,
           textAlign:"center",
           zindex:9,
           width:640,
           height:480,

         }} />
      </header>
      <footer style ={{
        background:'#282c34',
        color:'white',
        
      }}>
         <p style={{
           textAlign:'center',
         }}>Made with <img src={photo1} alt='img1' style={{
           width:'24px',
           height:'24px',
         }} /> and <img src={photo2} alt='img2' style={{
          width:'24px',
          height:'24px',
        }} />
         </p>
         <p>By Anmol Bajpai</p>

      </footer>
    </div>
  );
}

export default App;
