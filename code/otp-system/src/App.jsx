import './App.css';
import io from "socket.io-client";
import { useState } from 'react';

function App() {
  const socket = io("http://localhost:4110");
  const [messages,setMessages]=useState([]);
  socket.emit('join room',"OTPClient");
  socket.on("OTP",(message)=>{
      setMessages(()=>[...messages,message]);
  })

  return (
    <div className="App">
      <header className="App-header">
        <h1>OTP System</h1>
        <div className="messages">
          {messages.map((message)=><p>Phone Number: {message.phone}   OTP: {message.otp}</p>)}
        </div>
      </header>
    </div>
  );
}

export default App;
