import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardFooter,
  MDBCollapse,
} from "mdb-react-ui-kit";
import { Send, ArrowDownCircle } from "react-bootstrap-icons";
import { Button, Form, InputGroup } from "react-bootstrap";
import CollapsibleSender from "./collapsibleSenderMessage";
import CollapsibleReceiver from "./collapsibleReceiverMessage";
import axios from "axios";
import io from "socket.io-client";
import CustomDateString from "../../../Library/CustomDateTimeLibrary/CustomDateString";


const CollapsibleChat = (props) => {
  const socket = io("http://localhost:4110");
  const [sender, setSender] = useState("/demoProilePicture.jpg");
  const [receiver, setReceiver] = useState("/demoProilePicture.jpg");
  const [showShow, setShowShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const [messageNotifier,setMessageNotifier]=useState(null);
  const [notifications,setNotifications] = useState(0);

  const user = props.JWT;
  const toggleRead = async() =>{
    await axios.post('/api/profile/chat/toggleReadReceiver',{
      senderID:props.receiverID,
      receiverID:props.senderID,
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email',
      },
    })
  }

  const toggleShow = async() => {
    setNotifications(0);
    if(showShow===false){
      toggleRead();
    }
    setShowShow(!showShow);
  }

  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false);

  useEffect(() => {
    setLoading(true);
    socket.emit('join room', props.receiverID);
    const retrieveUser = async () => {
      await axios
        .get("/api/profile/user/getUser/" + props.senderID, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'idType':user.googleId?'google':'email',
          },
        })
        .then((result) => {
          setSender(result.data);
        });
      await axios
        .get("/api/profile/user/getUser/" + props.receiverID, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'idType':user.googleId?'google':'email',
          },
        })
        .then((result) => {
          setReceiver(result.data);
        });
    };
    retrieveUser();
    const retrieveMessages = async () =>{
      const value=await axios.post("/api/profile/chat/messages",{
        senderID:props.senderID,
        receiverID:props.receiverID
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'idType':user.googleId?'google':'email',
        },
      });
      value.data.sort((a,b)=>a.messageOrder-b.messageOrder);
      setMessages(value.data);
    }
    retrieveMessages();
    const retrieveMessageCount = async () => {
      const messages = await axios.post(
        "/api/profile/chat/countMessagesReceiver/",
        { 
          senderID: props.receiverID,
          receiverID: props.senderID
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'idType':user.googleId?'google':'email',
          },
        }
      );
      setNotifications(messages.data.count);
    };
    retrieveMessageCount();
    setLoading(false);
  }, []);

  useEffect(()=>{
    if(showShow===true && messageNotifier!==null){
      toggleRead();
      setNotifications(0);
    }
    if(showShow===false && messageNotifier!==null){
      setNotifications(notifications+1);
    }
  },[messageNotifier])

  socket.on("message",  (message) => {
    if(message.receiverID===props.receiverID && message.senderID===props.senderID){
      setMessageNotifier(message);
      setMessages((messages) => [...messages, message]);
    }
    else if(message.receiverID===props.senderID && message.senderID===props.receiverID){
      setMessageNotifier(message);
      setMessages((messages) => [...messages, message]);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let msg={
      senderID: props.senderID,
      receiverID: props.receiverID,
      SentTime: new CustomDateString(new Date()).getDateString(),
      messageContent: message,
    };
    if (message) {
      socket.emit("send_message", msg);
      setMessage("");
      msg.readStatus="receiver";
      await axios.post('/api/profile/chat/send',msg, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          'idType':user.googleId?'google':'email',
        },
      });
    }
  };
  if(loading===false){
    return (
      <MDBContainer
        fluid
        className="py-5"
        style={{
          width: "50vh",
          position: "fixed",
          zIndex: "5",
          marginRight: "2%",
          marginBottom: "2%",
          bottom: "2%",
          right: "2%",
        }}
      >
        <MDBBtn onClick={toggleShow} size="sm" style={{
          right: "2%",
          position: "fixed",
          zIndex: "5",
          marginRight: "2%",
          marginBottom: "2%",
          bottom: "2%",
          height: "10%",
          width: "5%",
          borderRadius: "50%",
          backgroundColor: "#3F51B5",
          boxShadow: "0px 0px 10px 0px rgba(0,0,0,0.5)",
        }} block>
          <div class="d-flex">
          {notifications>0?<span style={{verticalAlign:"super",display:"inline-block",lineHeight:"12px",textAlign:"center",fontSize:"12px",width:"12px",height:"12px",color:"#FFFFFF",backgroundColor:"red",borderRadius:"50%"}}> 
            {notifications}
            </span>:""}
            <span>Chat</span>
            <ArrowDownCircle />
          </div>
        </MDBBtn>
        <MDBCollapse show={showShow} className="mt-3">
          <MDBCard id="chat4">
            <div
              className="scrollable"
              style={{
                position: "relative",
                height: "400px",
                overflowY: "scroll",
              }}
            >
              <MDBCardBody>
                {messages.map((msg, index) =>
                  msg.receiverID === props.receiverID ? (
                    <CollapsibleReceiver
                      imageURL={receiver.imageURL}
                      message={msg.messageContent}
                      datetime={msg.SentTime}
                    />
                  ) : (
                    <CollapsibleSender
                      imageURL={sender.imageURL}
                      message={msg.messageContent}
                      datetime={msg.SentTime}
                    />
                  )
                )}
              </MDBCardBody>
            </div>
            <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
              <img
                src={receiver.imageURL}
                alt="avatar 2"
                style={{ width: "45px", height: "100%" }}
              />
              <Form onSubmit={handleSubmit} style={{width:"80vh"}}>
                <InputGroup>
                <Form.Control type="text"
                className="form-control form-control-sm"
                id="exampleFormControlInput3"
                placeholder="Type message"
                value={message}
                onChange={(e) => setMessage(e.target.value)}/>
                <Button type="submit">
                  <Send/>
                </Button>
                </InputGroup>
              </Form>
            </MDBCardFooter>
          </MDBCard>
        </MDBCollapse>
      </MDBContainer>
    );
  }
  else{
    return (
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ marginLeft: "50%", marginTop: "10%" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
};

export default CollapsibleChat;
