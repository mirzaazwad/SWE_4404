import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import io from 'socket.io-client';
import ChatBubble from 'react-chat-bubble';

const socket = io('http://localhost:4110');

const ChatRoom = () => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [obj,setObj]=useState([]);

  useEffect(() => {
    socket.on('message', (message) => {
      setMessages((messages) => [...messages, message]);
      setObj([]);
        let temp=[];
        messages.forEach((msg)=>{
          temp.push({
            "type":0,
            "image":'/demoProfilePicture.jpg',
            "text":msg.message
          });
        })
        setObj(temp);
    });
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (name && message) {
      socket.emit('send_message', { name, message });
      setName('');
      setMessage('');
    }
  };

  return ( 
    <div className="ChatRoom">
      <h1>Pharmacy Manager to Customer Chat</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" value={name} placeholder="Your name" onChange={(event) => setName(event.target.value)} />
        <input type="text" value={message} placeholder="Your message" onChange={(event) => setMessage(event.target.value)} />
        <button type="submit">Send</button>
      </form>
      {/* <ul>
        {messages.map((message, index) => (
          <li key={index}>
            {message.name}: {message.message}
          </li>
        ))}
      </ul> */}
      <ChatBubble messages = {obj} />
    </div>
   );
}
 
export default ChatRoom;