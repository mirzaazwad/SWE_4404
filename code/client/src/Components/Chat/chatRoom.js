import React from "react";
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBTypography,
  MDBInputGroup,
} from "mdb-react-ui-kit";
import { Send,Search,ArrowLeftCircle} from "react-bootstrap-icons";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import ChatTile from "../partials/chats/chatsTile";
import ChatSender from "../partials/chats/chatsSenderMessage";
import ChatReceiver from "../partials/chats/chatsReceiverMessage";

const ChatPage = () => {
  const {id}=useParams();
  return ( 
  <MDBContainer fluid className="py-5" style={{ backgroundColor: "#3354a9",height:"100vh"}}>
  <NavbarPharmacy id={id}/>
  <MDBRow>
    <MDBCol md="12">
      <MDBCard id="chat3" style={{ borderRadius: "15px",height:"90vh",marginTop:"3vh" }}>
        <MDBCardBody>
          <MDBRow>
            <MDBCol md="6" lg="5" xl="4" className="mb-4 mb-md-0">
              <div className="p-3">
                <MDBInputGroup className="rounded mb-3">
                <Button
                    className="input-group-text border-0"
                    id="search-addon"
                  >
                    <ArrowLeftCircle/>
                  </Button>
                  <input
                    className="form-control rounded"
                    placeholder="Search"
                    type="search"
                  />
                  <span
                    className="input-group-text border-0"
                    id="search-addon"
                  >
                    <Search/>
                  </span>
                </MDBInputGroup>

                <div className="scrollable"
                  style={{ position: "relative", height: "74vh",overflowY:'scroll' }}
                >
                  <MDBTypography listUnStyled className="mb-0">
                    <li className="p-2 border-bottom">
                      <ChatTile sender="Mirza Azwad" time="Just Now" messageCount="3" imageURL="/demoProilePicture.jpg" message="Hello World"/>
                    </li>
                  </MDBTypography>
                </div>
              </div>
            </MDBCol>
            <MDBCol md="6" lg="7" xl="8">
              <div className="scrollable pt-3 pe-3"
                style={{ position: "relative", height: "74vh",overflowY:"scroll"}}
              >
                <ChatSender imageURL="/demoProilePicture.jpg" message="Why are you even doing this project?" datetime="12:00 PM | Aug 13"/>
                <ChatReceiver  imageURL="/demoProilePicture.jpg" message="Why are you even alive?" datetime="12:00 PM | Aug 13"></ChatReceiver>

              </div>
              <div className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2">
                <img
                  src="/demoProilePicture.jpg"
                  alt="avatar 3"
                  style={{ width: "40px", height: "100%" }}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput2"
                  placeholder="Type message"
                />
                <Button className="ms-3" href="#!">
                  <Send/>
                </Button>
              </div>
            </MDBCol>
          </MDBRow>
        </MDBCardBody>
      </MDBCard>
    </MDBCol>
  </MDBRow>
</MDBContainer> );
}
 
export default ChatPage;
