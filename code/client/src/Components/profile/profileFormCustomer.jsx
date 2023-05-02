import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "../../index.css";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerUser } from "../../Contexts/action";
import CryptoJS from "crypto-js";
import PhoneVerify from "../partials/phone/phoneVerify";
import { useSocket } from "../../Hooks/useSocket";

const ProfileFormCustomer = (id) => {
  const _id = id;
  const buyer = useSelector((state) => state.userState.buyerState);
  const user = useSelector((state) => state.userState.user);
  const socket=id.socket;
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setisLocked] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error,setError]=useState("");
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =useState(false);
  const [errorPassword,setErrorPassword] = useState(false);
  const [password, changePassword] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const [showPhoneVerify,setShowPhoneVerify]=useState(false);
  const [phoneNumberChanged,setPhoneNumberChanged] = useState(false);
  const handleClosePhoneVerify=()=>{
    setShowPhoneVerify(false);
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  useEffect(() => {
    setUsername(buyer.username);
    setPhone(buyer.phone);
    setLoaded(true);
  }, [buyer]);

  const setPassword = (e) =>{
    changePassword(e.target.value);
    setError("");
  }
  const turnOnEdit = (data) => {
    setIsDisabled(false);
    setIsEditing(data);
  };

  const turnOffEdit = () => {
    setIsDisabled(true);
    setIsEditing(false);
  };

  const verify = async (_id,password) => {
    await axios.post("/api/profile/user/verify", {_id,password}, {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((result)=>{
      console.log(result);
      setErrorPassword(!result.data.success);
    }).catch((error)=>{
      console.log(error);
      setErrorPassword(true);
    })
  };

  const setPhoneNumber=(phone)=>{
    setPhoneNumberChanged(true);
    if(phone.length!=11){
      setError("Phone Number Must be 11 digits");
    }
    else{
      setError("");
    }
    setPhone(phone);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    turnOffEdit();
    setisLocked(true);
    setError("");
    await verify(_id.id,CryptoJS.SHA512(password).toString());
    if(!errorPassword){
      if(!phoneNumberChanged){
        await axios
      .patch(
        "/api/profile/user/updateUser/" + _id.id,
        {
          username: username
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((result) => {
        handleClose();
        dispatch(setBuyerUser(result.data));
      })
      }
      else{
        handleClose();
        let OTP = Math.floor(100000 + Math.random() * 900000).toString();
        let currentDate=new Date();
        socket.emit('OTP',{phone:phone,otp:OTP,sendingTime:currentDate});
        await axios.post('/api/mobile/OTPsend',{
          phone:phone,
          otp:OTP,
          sendingTime:currentDate
        },{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }).then(()=>{
          console.log('comes here');
          setShowPhoneVerify(true);
        }).catch((err)=>{
          setError(err.response.data.error);
        })
      }
    }
    else{
      console.log('comes here');
      setError("Password is incorrect");
    }
    setIsEditing(false);
    setisLocked(false);
  };
  if(loaded===true){
    return (
      <div>
        <div className="profileInfo d-flex justify-content-between">
          <h4 className="InfoHeader mb-4">Personal Information</h4>
          <button
            className="btn btn-outline-dark btn-editProfile "
            onClick={()=>turnOnEdit(!isEditing)}
          >
            Edit Profile
            <i className="bx bx-cog bx-sm"></i>
          </button>
        </div>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              disabled={isDisabled}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Contact No.</Form.Label>
          <InputGroup>
          <InputGroup.Text>+880</InputGroup.Text>
          <Form.Control type="email" placeholder="Enter contact no." disabled={isDisabled} value ={phone} onChange={(e)=>setPhoneNumber(e.target.value)} />
          </InputGroup>
          <div className="errorMessage" style={{color:"red"}}>{error}</div>
        </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              disabled={true}
              value={buyer.email}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            {isEditing && (
              <a href={"changePassword/" + user._id}>Change Password</a>
            )}
          </Form.Group>
  
          {isEditing && (
            <Button
              className="btn btn-outline-dark btn-save"
              disabled={isLocked}
              onClick={handleShow}
            >
              Save
            </Button>
          )}
        
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Enter Password to Confirm Changes</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <div className="errorMessageShow" style={{color:"red"}}>{error}</div>
              <Form.Group className="mb-3" controlId="enterPassword">
                <Form.Label>Enter Password</Form.Label>
                <InputGroup>
                  <Form.Control
                    type={currentPasswordVisibility ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={setPassword}
                  />
                  <InputGroup.Text>
                    {(currentPasswordVisibility && (
                      <EyeFill
                        color="#3354a9"
                        onClick={() => setCurrentPasswordVisibility(false)}
                      />
                    )) ||
                      (!currentPasswordVisibility && (
                        <EyeSlashFill
                          color="#3354a9"
                          onClick={() => setCurrentPasswordVisibility(true)}
                        />
                      ))}
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
      <PhoneVerify _id={_id.id} user={user} data={{phone:phone,username:username}} show={showPhoneVerify} handleClose={handleClosePhoneVerify} socket={socket}/>
      </div>
    );
  }
  else{
    return (
      <div
        class="spinner-border text-primary"
        role="status"
        style={{ marginLeft: "50%", marginTop: "10%" }}
      >
        <span class="visually-hidden">Loading...</span>
      </div>
    );
  }
};
export default ProfileFormCustomer;