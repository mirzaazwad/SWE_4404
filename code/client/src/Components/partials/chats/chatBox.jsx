import { useEffect, useState } from "react";
import ChatReceiver from "./chatsReceiverMessage";
import ChatSender from "./chatsSenderMessage";
import axios from "axios";

const ChatBox = (props) => {
  const [messages,setMessages]=useState([]);
  const [isLoading,setIsLoading]=useState(true);
  useEffect(()=>{
    setIsLoading(true);
    async function retrieveMessages(){
      setIsLoading(true);
      const value=await axios.post("/api/profile/chat/messages",{
        senderID:props.senderID,
        receiverID:props.id
      }, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
        },
      });
      value.data.sort((a,b)=>a.messageOrder-b.messageOrder);
      setMessages(value.data);
      setIsLoading(false);
    }
    if(props.senderID){
      retrieveMessages();
    }
  },[props.senderID]);

  useEffect(()=>{
    const message=props.message;
    if(message!==null){
      if(props.noSubscriber===true){
        props.handleReload(false);
      }
      setMessages((messages) => [...messages, message]);
    }
  },[props.message])

  if(props.noSubscriber===true || !isLoading){
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
              imageURL={props.receiverImageURL}
              message={msg.messageContent}
              datetime={msg.SentTime}
            />
          ) : (
            <ChatSender
              imageURL={props.senderImageURL}
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