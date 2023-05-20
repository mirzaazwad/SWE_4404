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
import ChatBox from "./chatBox";
import SendMessageChatRoom from "./chatSendMessage";
import { useToken } from "../../Hooks/useToken";
import chatPharmacy from "../../Library/Chat/chatPharmacy";

const ChatPage = () => {
  const user = useToken();
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

  const toggleChat=async(sent)=>{
    let obj = Object.create(Object.getPrototypeOf(chatUser), Object.getOwnPropertyDescriptors(chatUser));
    await obj.ToggleChat(sent);
    setChatUser(obj);
  }

  useEffect(()=>{
    const retrieveUsers = async () => {
      setLoading(true);
      const chat=new chatPharmacy(user._id,user.token,user.googleId);
      await chat.retrieveChatInformation();
      setChatUser(chat);
      setLoading(false);
      setFilter(chat.senders);
    };
    retrieveUsers();
  },[user])

  if (chatUser!==null) {
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
                            <button style={{marginLeft:"0vh",paddingLeft:"0vh",border:"none",backgroundColor:sent.senderID===currentSender.senderID?"#ECECEC":"transparent",width:"60vh"}} onClick={()=>toggleChat(sent)}>
                            <ChatTile
                            user={chatUser}
                            sender={sent}
                            time={chatUser.getTime(sent.senderID)}
                            message={chatUser.getLastMessage(sent.senderID)}
                            index={index}
                          /></button>
                          ))}
                        </MDBTypography>
                      </div>
                    </div>
                  </MDBCol>
                  <MDBCol md="6" lg="7" xl="8">
                    <ChatBox user={chatUser} />
                    <SendMessageChatRoom noSubscriber={chatUser.noSubscriber} user={user} receiverID={chatUser._id} imageURL={chatUser.imageURL} senderID={currentSender.senderID} />
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
