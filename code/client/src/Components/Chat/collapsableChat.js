import React, { useState } from "react";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBBtn,
  MDBCardFooter,
  MDBCollapse,
} from "mdb-react-ui-kit";

import { Send,ArrowDownCircle} from "react-bootstrap-icons";
import CollapsibleSender from "../partials/chats/collapsibleSenderMessage";
import CollapsibleReceiver from "../partials/chats/collapsibleReceiverMessage";

const CollapsibleChat = () => {
  const [showShow, setShowShow] = useState(false);
  const toggleShow = () => setShowShow(!showShow);
  return (
    <MDBContainer fluid className="py-5" style={{width:"50%",position:"absolute",zIndex:"5",marginRight:"0%",marginTop:"2%"}}>
          <MDBBtn onClick={toggleShow} size="sm" block>
            <div class="d-flex">
              <span>Collapsible Chat App</span>
              <ArrowDownCircle/>
            </div>
          </MDBBtn>
          <MDBCollapse show={showShow} className="mt-3">
            <MDBCard id="chat4">
              <div className="scrollable"
                style={{ position: "relative", height: "400px",overflowY:"scroll" }}
              >
                <MDBCardBody>
                  
                  <CollapsibleSender imageURL="/demoProilePicture.jpg" message="Hello World" datetime="12:00 PM | AUG 13"/>
                  <CollapsibleSender imageURL="/demoProilePicture.jpg" message="Hello World" datetime="12:01 PM | AUG 13"/>
                  <div className="divider d-flex align-items-center mb-4">
                    <p
                      className="text-center mx-3 mb-0"
                      style={{ color: "#a2aab7" }}
                    >
                      Today
                    </p>
                  </div>
                  <CollapsibleReceiver imageURL="/demoProilePicture.jpg" message="Hello World" datetime="12:00 PM | AUG 13"/>
                  <CollapsibleReceiver imageURL="/demoProilePicture.jpg" message="Hello World" datetime="12:01 PM | AUG 13"/>
                  
                </MDBCardBody>
              </div>
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                <img
                  src="/demoProilePicture.jpg"
                  alt="avatar 3"
                  style={{ width: "45px", height: "100%" }}
                />
                <input
                  type="text"
                  className="form-control form-control-sm"
                  id="exampleFormControlInput3"
                  placeholder="Type message"
                />
                <a className="ms-3 link-info" href="#!">
                  <Send></Send>
                </a>
              </MDBCardFooter>
            </MDBCard>
          </MDBCollapse>
    </MDBContainer>
  ); 
}
 
export default CollapsibleChat;
