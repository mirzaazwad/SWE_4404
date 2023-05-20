import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import PhoneVerify from "./PhoneVerification/phoneVerify";
import ConfirmPasswordModal from "./confirmPasswordModal";
import phoneOTP from "../../Library/OTPHandler/otpPhone";
import deliveryUser from "../../Library/User/delivery-man";

const ProfileFormDelivery = ({socket,user}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked , setisLocked] = useState(false);
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =useState(false);
  const [showPhoneVerify,setShowPhoneVerify]=useState(false);
  const [phoneNumberChanged,setPhoneNumberChanged] = useState(false);
  const [otpHandler,setOTPHandler]=useState(null);
  const [delivery,setDelivery]=useState(null);
  const [error,setError]=useState("");

  useEffect(()=>{
    if(user instanceof deliveryUser){
      setDelivery(user);
    }
  },[user])

  const handleClosePhoneVerify=()=>{
    setShowPhoneVerify(false);
  }
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async(e) => {
    if(delivery.googleId){
      handleSubmit(e);
    }
    else{
      const validNumber=await delivery.validatePhoneNumber();
        if(!validNumber){
          setError("Mobile Number is invalid");
          return;
        }
      setShow(true);
    }
  }

  const turnOnEdit = (data) => {
    setIsDisabled(false);
    setIsEditing(data);
  }
  const turnOffEdit = () => {
    setIsDisabled(true);
    setIsEditing(false);
  }

  const setPhoneNumber=(phone)=>{
    setPhoneNumberChanged(true);
    if(phone.length!==11){
      setError("Phone Number Must be 11 digits");
    }
    else{
      setError("");
    }
    let obj = Object.create(Object.getPrototypeOf(delivery), Object.getOwnPropertyDescriptors(delivery));
    obj.phone=phone;
    setDelivery(obj);
  }

  const setUsername=(e)=>{
    let obj = Object.create(Object.getPrototypeOf(delivery), Object.getOwnPropertyDescriptors(delivery));
    obj.username=e.target.value;
    setDelivery(obj);
  }

  const setPassword=(password)=>{
    let obj = Object.create(Object.getPrototypeOf(delivery), Object.getOwnPropertyDescriptors(delivery));
    obj.password=password;
    setDelivery(obj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    turnOffEdit();
    setisLocked(true);
    if(delivery.googleId){
      if(!phoneNumberChanged){
        console.log(delivery);
        let obj = Object.create(Object.getPrototypeOf(delivery), Object.getOwnPropertyDescriptors(delivery));
        await obj.update();
        console.log(obj);
        setDelivery(obj);
      }
      else{
        handleClose();
        const OTPService=new phoneOTP(delivery.phone,delivery.token,delivery.googleId,socket);
        setOTPHandler(OTPService);
        if(OTPService.sendOTP()){
          setShowPhoneVerify(true);
        }
        else{
          setError(OTPService.error);
        }
        setPhoneNumberChanged(false);
      }
    }
    else{
      if(!phoneNumberChanged){
        let obj = Object.create(Object.getPrototypeOf(delivery), Object.getOwnPropertyDescriptors(delivery));
        await obj.update();
        setDelivery(obj);
        if(!obj.error){
          handleClose();
        }
      }
      else{
        const invalid=await delivery.verifyPassword();
        if(invalid){
          return;
        }
        handleClose();
        const OTPService=new phoneOTP(delivery.phone,delivery.token,delivery.googleId,socket);
        setOTPHandler(OTPService);
        if(OTPService.sendOTP()){
          setShowPhoneVerify(true);
        }
        else{
          setError(OTPService.error);
        }
        setPhoneNumberChanged(false);
      }
    }
    setIsEditing(false);
    setisLocked(false);
  };
  if(delivery){
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
        <div className="error" style={{color:"red"}}>{error}</div>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              disabled={isDisabled}
              value={delivery.username}
              onChange={setUsername}
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Contact No.</Form.Label>
          <InputGroup>
          <InputGroup.Text>+880</InputGroup.Text>
          <Form.Control type="email" placeholder="Enter contact no." disabled={isDisabled} value ={delivery.phone} onChange={(e)=>setPhoneNumber(e.target.value)} />
          </InputGroup>
        </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              disabled={true}
              value={delivery.email}
            />
          </Form.Group>
          <InputGroup className="mb-3" controlId="formBasicPassword">
          {!delivery.googleId && isEditing &&(<a href={"changePassword/" + user._id} style={{marginLeft:"75%"}}>Change Password</a>)}
        </InputGroup>
        {isEditing && (
          <Button className="btn btn-outline-dark btn-save" disabled={isLocked} onClick={handleShow}>
            Save
          </Button>
        )}
      </Form>
      <ConfirmPasswordModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} error={delivery.errorMessage} passwordVisibility={{currentPasswordVisibility,setCurrentPasswordVisibility}} password={{password:delivery.password,setPassword:setPassword}}/>
      <PhoneVerify user={{user:delivery,setUser:setDelivery}} otpHandler={{otpHandler:otpHandler,setOTPHandler:setOTPHandler}} show={{show:showPhoneVerify,handleClose:handleClosePhoneVerify}} socket={socket}/>
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
export default ProfileFormDelivery;
