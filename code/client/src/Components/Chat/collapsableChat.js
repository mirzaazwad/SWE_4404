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
                  <div className="d-flex flex-row justify-content-start">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
                      >
                        Hi
                      </p>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
                      >
                        How are you ...???
                      </p>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
                      >
                        What are you doing tomorrow? Can we come up a bar?
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">
                        23:58
                      </p>
                    </div>
                  </div>

                  <div className="divider d-flex align-items-center mb-4">
                    <p
                      className="text-center mx-3 mb-0"
                      style={{ color: "#a2aab7" }}
                    >
                      Today
                    </p>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4 pt-1">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Hiii, I'm good.
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        How are you doing?
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Long time no see! Tomorrow office. will be free on
                        sunday.
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:06
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
                      >
                        Okay
                      </p>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
                      >
                        We will go on Sunday?
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">
                        00:07
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        That's awesome!
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        I will meet you Sandon Square sharp at 10 AM
                      </p>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Is that okay?
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:09
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
                      >
                        Okay i will meet you on Sandon Square
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">
                        00:11
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end mb-4">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Do you have pictures of Matley Marriage?
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:11
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div>

                  <div className="d-flex flex-row justify-content-start mb-4">
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                    <div>
                      <p
                        className="small p-2 ms-3 mb-1 rounded-3"
                        style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
                      >
                        Sorry I don't have. i changed my phone.
                      </p>
                      <p className="small ms-3 mb-3 rounded-3 text-muted">
                        00:13
                      </p>
                    </div>
                  </div>

                  <div className="d-flex flex-row justify-content-end">
                    <div>
                      <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
                        Okay then see you on sunday!!
                      </p>
                      <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
                        00:15
                      </p>
                    </div>
                    <img
                      src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava2-bg.webp"
                      alt="avatar 1"
                      style={{ width: "45px", height: "100%" }}
                    />
                  </div>
                </MDBCardBody>
              </div>
              <MDBCardFooter className="text-muted d-flex justify-content-start align-items-center p-3">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava5-bg.webp"
                  alt="avatar 3"
                  style={{ width: "45px", height: "100%" }}
                />
                <input
                  type="text"
                  className="form-control form-control-lg"
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
