import React from 'react'
import { Navigate } from 'react-router-dom'
import { randomUrl } from './getRandomUrl'

// import useWebSocket from 'react-use-websocket';

import { useEffect, useState } from "react";

const NavigatorElem = () => {
  // const { sendMessage, lastMessage } = useWebSocket('ws://localhost:8080',{
  //   onOpen : ()=>console.log(`webSocket connected successfully from react `),
  //   onClose : ()=>console.log(`webSocket disConnected successfully from react `),
  //   onError : (e)=>console.error('WebSocket error:', e),
  //   onMessage : (e)=> console.log('Received message:', e.data),
  // });
  // const [message,setMessage] = useState('');


  // const handleClick = () => {
  //   sendMessage(message);
  // };

  return (
    <Navigate to={`/${randomUrl()}`} />
    // <div>
    //   <button onClick={handleClick}>Send Message</button>
    //   <input type="text" value={message} onChange={(e)=>setMessage(e.target.value)} />
    //   <p>Last Message: {lastMessage ? lastMessage.data : 'None'}</p>
    // </div>
  )
}

export default NavigatorElem
