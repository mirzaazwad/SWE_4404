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
import { Search } from "react-bootstrap-icons";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import ChatTile from "./chatsTile";
import axios from "axios";
import io from "socket.io-client";
import ChatBox from "./chatBox";
import SendMessageChatRoom from "./chatSendMessage";
import { useToken } from "../../Hooks/useToken";
import chatPharmacy from "../../Library/Chat/chatPharmacy";

const ChatPage = () => {
  const user = useToken();
  const socket = io("http://localhost:4110");
  const [currentSender, setCurrentSender] = useState({});
  const [currentSenderID, setCurrentSenderID] = useState("");
  const [loading, setLoading] = useState(false);
  const [chatUser,setChatUser]=useState(null);
  const [filteredValues,setFilter]=useState([]);
  const [searchValue,setSearchValue]=useState("");
  const [toggle,setToggle]=useState(false);
  const [newMessage,setNewMessage]=useState(null);

  const changeContacts = (input) =>{
    console.log(input);
    setSearchValue(input);
    if(input!==""){
      setFilter(chatUser.senders.filter(sender=>sender.senderName.toLowerCase().includes(input.toLowerCase())));
    }
    else{
      setFilter(chatUser.senders);
    }
  }

  const retrieveUsers = async () => {
    setLoading(true);
    const chat=new chatPharmacy(user._id,user.token,user.googleId);
    await chat.retrieveMessages();
    setChatUser(chat);
    setLoading(false);
  };

  socket.on("message",(message)=>{
    setNewMessage(message);
    if(message.receiverID===chatUser._id){
      chatUser.messagesMap.set(message.senderID,{lastMessage:message.messageContent,lastMessageTime:message.SentTime});
    }
    else if(message.senderID===chatUser._id){
      chatUser.messagesMap.set(message.receiverID,{lastMessage:message.messageContent,lastMessageTime:message.SentTime});
    }
  })

  useEffect(() => {
    setLoading(true);
    socket.emit("join room", user._id);
    retrieveUsers();
  }, [chatUser.noSubscriber]);

  const ToggleChat = async(sent) =>{
    setCurrentSender(sent);
    setCurrentSenderID(sent.senderID);
    console.log("Current Sender ID:",currentSenderID);
    await axios.post('/api/profile/chat/toggleRead',{
      senderID:chatUser._id,
      receiverID:sent.senderID
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email',
      },
    }).then(()=>{
      setToggle(toggle^true);
    });
  }

  useEffect(()=>{
    if(chatUser.senders.length>0){
      ToggleChat(chatUser.senders[0]);
    }
  },[chatUser.senders])

  if (!loading) {
    return (
      <MDBContainer
        fluid
        className="py-5"
        style={{ backgroundColor: "#3354a9", height: "100vh" }}
      >
        <NavbarPharmacy toggle={toggle} user={user}/>
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
                            time={chatUser.messagesMap.get(sent.senderID).lastMessageTime}
                            messageCount={newMessage}
                            id={chatUser._id}
                            imageURL={sent.senderImageURL}
                            message={chatUser.messagesMap.get(sent.senderID).lastMessage}
                            index={index}
                            user={user}
                            currentSender={currentSenderID}
                            noSubscriber={chatUser.noSubscriber}
                          /></button>
                          ))}
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="6" lg="7" xl="8">
                    <ChatBox handleReload={chatUser.noSubscriber}  noSubscriber={chatUser.noSubscriber} id={chatUser._id} senderID={currentSenderID} receiverImageURL={chatUser.imageURL} senderImageURL={currentSender.senderImageURL} user={chatUser} socket={socket} message={newMessage}/>
                    <SendMessageChatRoom noSubscriber={chatUser.noSubscriber} user={user} receiverID={chatUser._id} imageURL={chatUser.imageURL} senderID={currentSender.senderID} socket={socket} />
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
