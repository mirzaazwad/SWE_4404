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
import CollapsibleSender from "../partials/chats/collapsibleSenderMessage";
import CollapsibleReceiver from "../partials/chats/collapsibleReceiverMessage";
import axios from "axios";
import io from "socket.io-client";
import toDateString from "../../LibraryFunctions/toDateString";

const CollapsibleChat = (props) => {
  const socket = io("http://localhost:4110");
  const [sender, setSender] = useState("/demoProilePicture.jpg");
  const [receiver, setReceiver] = useState("/demoProilePicture.jpg");
  const [showShow, setShowShow] = useState(false);
  const [messages, setMessages] = useState([]);
  const toggleShow = () => setShowShow(!showShow);
  const [message, setMessage] = useState("");
  const [loading,setLoading]=useState(false);
  const user = props.JWT;

  useEffect(() => {
    setLoading(true);
    socket.emit('join room', props.receiverID);
    const retrieveUser = async () => {
      await axios
        .get("/api/profile/user/getUser/" + props.senderID, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          setSender(result.data);
        });
      await axios
        .get("/api/profile/user/getUser/" + props.receiverID, {
          headers: {
            Authorization: `Bearer ${user.token}`,
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
        },
      });
      value.data.sort((a,b)=>a.messageOrder-b.messageOrder);
      setMessages(value.data);
    }
    retrieveMessages();
    
    setLoading(false);
  }, []);

  socket.on("message", (message) => {
    if(message.receiverID===props.receiverID && message.senderID===props.senderID){
      setMessages((messages) => [...messages, message]);
    }
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    let msg={
      senderID: props.senderID,
      receiverID: props.receiverID,
      SentTime: toDateString(new Date()),
      messageContent: message,
    };
    if (message) {
      socket.emit("send_message", msg);
      await axios.post('/api/profile/chat/send',msg, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessage("");
    }
  };
  if(loading===false){
    return (
      <MDBContainer
        fluid
        className="py-5"
        style={{
          width: "50vh",
          position: "absolute",
          zIndex: "5",
          marginRight: "0%",
          marginTop: "2%",
        }}
      >
        <MDBBtn onClick={toggleShow} size="sm" block>
          <div class="d-flex">
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
