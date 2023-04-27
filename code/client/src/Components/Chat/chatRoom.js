import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { Send, Search, ArrowLeftCircle } from "react-bootstrap-icons";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ChatTile from "../partials/chats/chatsTile";
import axios from "axios";
import io from "socket.io-client";
import toDateString from "../../LibraryFunctions/toDateString";
import { useDispatch, useSelector } from "react-redux";
import ChatBox from "../partials/chats/chatBox";
import toDate from "../../LibraryFunctions/toDate";
import { setNotification } from "../../Contexts/action";
import timeElapsed from "../../LibraryFunctions/timeElapsed";

const ChatPage = () => {
  const { id } = useParams();
  const dispatch=useDispatch();
  const user = useSelector((state) => state.userState.user);
  const socket = io("http://localhost:4110");
  const [receiver, setReceiver] = useState({});
  const [currentSender, setCurrentSender] = useState({});
  const [currentSenderID, setCurrentSenderID] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [senders, setSenders] = useState([]);
  const [filteredValues,setFilter]=useState([]);
  const [searchValue,setSearchValue]=useState("");
  const [toggle,setToggle]=useState(false);
  const [messagesMap,setMessagesMap]=useState(new Map());
  const [newMessage,setNewMessage]=useState(null);
  const [messages,setMessages]=useState([]);

  const changeContacts = (input) =>{
    console.log(input);
    setSearchValue(input);
    if(input!==""){
      setFilter(senders.filter(sender=>sender.senderName.toLowerCase().includes(input.toLowerCase())));
    }
    else{
      setFilter(senders);
    }
  }

  const getSender = async(senderID)=>{
    const result=await axios.get('/api/profile/user/getUser/'+senderID, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    let temp=senders;
    senders.push(result);
    setSenders(temp);
  }

  const retrieveUsers = async () => {
    setLoading(true);
    const value = await axios.get("/api/profile/chat/senders/" + id, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });
    setSenders(value.data)
    setFilter(value.data);
    value.data.forEach((sent)=>messagesMap.set(sent.senderID,{lastMessage:sent.lastMessage,lastMessageTime:sent.lastMessageTime}));
    setLoading(false);
  };

  socket.on("message",(message)=>{
    setNewMessage(message);
    if(message.receiverID===id){
      messagesMap.set(message.senderID,{lastMessage:message.messageContent,lastMessageTime:message.SentTime});
    }
    else if(message.senderID===id){
      console.log("Expected Receiver ID: ",id);
      console.log(message);
      console.log(messagesMap.get(message.receiverID));
      messagesMap.set(message.receiverID,{lastMessage:message.messageContent,lastMessageTime:message.SentTime});
      console.log(messagesMap.get(message.receiverID));
    }
  })

  useEffect(() => {
    setLoading(true);
    socket.emit("join room", id);
    const getReceiver = async () => {
      await axios
        .get("/api/profile/user/getUser/" + id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          setReceiver(result.data);
        });
    };
    getReceiver();
    retrieveUsers();
  }, []);

  const ToggleChat = async(sent) =>{
    setCurrentSender(sent);
    setCurrentSenderID(sent.senderID);
    console.log("Current Sender ID:",currentSenderID);
    await axios.post('/api/profile/chat/toggleRead',{
      senderID:id,
      receiverID:sent.senderID
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((result)=>{
      setToggle(toggle^true);
    });
  }

  useEffect(()=>{
    if(senders.length>0){
      ToggleChat(senders[0]);
    }
  },[senders])



  const handleSubmit = async (event) => {
    event.preventDefault();
    let msg = {
      senderID: currentSender.senderID,
      receiverID: id,
      SentTime: toDateString(new Date()),
      messageContent: message,
    };
    if (message) {
      socket.emit("send_message", msg);
      await axios.post("/api/profile/chat/send", msg, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      setMessage("");
    }
  };

  if (!loading) {
    return (
      <MDBContainer
        fluid
        className="py-5"
        style={{ backgroundColor: "#3354a9", height: "100vh" }}
      >
        <NavbarPharmacy id={id} toggle={toggle} user={user}/>
        <MDBRow>
          <MDBCol md="12">
            <MDBCard
              id="chat3"
              style={{ borderRadius: "15px", height: "90vh", marginTop: "3vh" }}
            >
              <MDBCardBody>
                <MDBRow>
                  <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
                    <div className="p-3">
                      <MDBInputGroup className="rounded mb-3">
                        <Button
                          className="input-group-text border-0"
                          id="search-addon"
                        >
                          <ArrowLeftCircle />
                        </Button>
                        <input
                          className="form-control rounded"
                          placeholder="Search"
                          type="search"
                          onChange={(e)=>changeContacts(e.target.value)}
                          value={searchValue}
                        />
                        <span
                          className="input-group-text border-0"
                          id="search-addon"
                        >
                          <Search />
                        </span>
                      </MDBInputGroup>

                      <div
                        className="scrollable"
                        style={{
                          position: "relative",
                          height: "74vh",
                          overflowY: "scroll",
                        }}
                      >
                        <MDBTypography listUnStyled className="mb-0">
                          {filteredValues.map((sent, index) => (
                            <button style={{marginLeft:"0vh",paddingLeft:"0vh",border:"none",backgroundColor:sent.senderID===currentSender.senderID?"#ECECEC":"transparent",width:"60vh"}} onClick={()=>ToggleChat(sent)}>
                            <ChatTile
                            sender={sent}
                            time={timeElapsed(messagesMap.get(sent.senderID).lastMessageTime)}
                            messageCount={newMessage}
                            id={id}
                            imageURL={sent.senderImageURL}
                            message={messagesMap.get(sent.senderID).lastMessage}
                            index={index}
                            user={user}
                            currentSender={currentSenderID}
                          /></button>
                          ))}
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="6" lg="7" xl="8">
                    <ChatBox id={id} senderID={currentSenderID} receiverImageURL={receiver.imageURL} senderImageURL={currentSender.senderImageURL} user={user} socket={socket} message={newMessage}/>
                      <form className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2" onSubmit={handleSubmit}> 
                      <img
                        src={receiver.imageURL}
                        alt="avatar 3"
                        style={{ width: "40px", height: "100%" }}
                      />
                      <input
                        type="text"
                        className="form-control form-control-sm"
                        placeholder="Type message"
                        value={message}
                        onChange={(e)=>setMessage(e.target.value)}
                      />
                      <Button className="ms-3" type="submit">
                        <Send />
                      </Button>
                      </form>
                  </MDBCol>
                </MDBRow>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    );
  } else {
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

export default ChatPage;
