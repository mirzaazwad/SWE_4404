import { useEffect, useState } from "react";
import ChatReceiver from "./chatsReceiverMessage";
import ChatSender from "./chatsSenderMessage";
import axios from "axios";
import io from "socket.io-client";

const ChatBox = (props) => {
  const socket = io("http://localhost:4110");
  const [messages,setMessages]=useState([]);
  const [isLoading,setIsLoading]=useState(true);

  useEffect(()=>{
    setIsLoading(true);
    const retrieveMessages = async () =>{
      const value=await axios.post("/api/profile/chat/messages",{
        senderID:props.sender.senderID,
        receiverID:props.receiver._id
      }, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      value.data.sort((a,b)=>a.messageOrder-b.messageOrder);
      setMessages(value.data);
      setIsLoading(false);
    }
    retrieveMessages();
    console.log("Messages from sender: ",messages);
  },[props]);

  socket.on("message", (message) => {
    if(message.receiverID===props.receiver._id && message.senderID===props.sender.senderID){
      setMessages((messages) => [...messages, message]);
    }
  });

  if(props.sender===null || !isLoading){
    return ( 
      <div
        className="scrollable pt-3 pe-3"
        style={{
          position: "relative",
          height: "74vh",
          overflowY: "scroll",
        }}
      >
        {messages.map((msg, index) =>
          msg.receiverID === props.id ? (
            <ChatReceiver
              imageURL={props.receiver.imageURL}
              message={msg.messageContent}
              datetime={msg.SentTime}
            />
          ) : (
            <ChatSender
              imageURL="/demoProilePicture.jpg"
              message={msg.messageContent}
              datetime={msg.SentTime}
            />
          )
        )}
      </div> );
  }
  else {
    return (
      <div
        className="scrollable pt-3 pe-3"
        style={{
          position: "relative",
          height: "74vh",
          overflowY: "scroll",
        }}
      >
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ marginLeft: "50%", marginTop: "10%" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      </div>
    );
  }
}

 
export default ChatBox;