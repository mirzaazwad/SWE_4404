import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import PhoneVerify from "./PhoneVerification/phoneVerify";
import Map from "../partials/Map/map";
import ConfirmPasswordModal from "./confirmPasswordModal";
import phoneOTP from "../../Library/OTPHandler/otpPhone";
import buyerUser from "../../Library/User/buyer";

const ProfileFormCustomer = ({socket,user}) => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked , setisLocked] = useState(false);
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =useState(false);
  const [showPhoneVerify,setShowPhoneVerify]=useState(false);
  const [phoneNumberChanged,setPhoneNumberChanged] = useState(false);
  const [showMAP,setShowMAP]=useState(false);
  const [stopDropDown,setStopDropDown]=useState(false);
  const [otpHandler,setOTPHandler]=useState(null);
  const [buyer,setBuyer]=useState(null);
  const [error,setError]=useState("");

  useEffect(()=>{
    if(user instanceof buyerUser){
      setBuyer(user);
    }
  },[user])

  const handleClosePhoneVerify=()=>{
    setShowPhoneVerify(false);
  }
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async(e) => {
    if(buyer.googleId){
      handleSubmit(e);
    }
    else{
      const validNumber=await buyer.validatePhoneNumber();
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
    let obj = Object.create(Object.getPrototypeOf(buyer), Object.getOwnPropertyDescriptors(buyer));
    obj.phone=phone;
    setBuyer(obj);
  }

  const setAddress=(address)=>{
    let obj = Object.create(Object.getPrototypeOf(buyer), Object.getOwnPropertyDescriptors(buyer));
    obj.address=address;
    setBuyer(obj);
  }

  const setUsername=(e)=>{
    let obj = Object.create(Object.getPrototypeOf(buyer), Object.getOwnPropertyDescriptors(buyer));
    obj.username=e.target.value;
    setBuyer(obj);
  }

  const setLocation=(coordinates)=>{
    let obj = Object.create(Object.getPrototypeOf(buyer), Object.getOwnPropertyDescriptors(buyer));
    obj.coordinates=coordinates;
    setBuyer(obj);
  }

  const setPassword=(password)=>{
    let obj = Object.create(Object.getPrototypeOf(buyer), Object.getOwnPropertyDescriptors(buyer));
    obj.password=password;
    setBuyer(obj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    turnOffEdit();
    setisLocked(true);
    if(!buyer.hasOwnProperty('coordinates')){
      setError("Location must be provided for pharmacy");
      return;
    }
    if(buyer.googleId){
      if(!phoneNumberChanged){
        console.log(buyer);
        let obj = Object.create(Object.getPrototypeOf(buyer), Object.getOwnPropertyDescriptors(buyer));
        await obj.update();
        console.log(obj);
        setBuyer(obj);
      }
      else{
        handleClose();
        const OTPService=new phoneOTP(buyer.phone,buyer.token,buyer.googleId,socket);
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
        let obj = Object.create(Object.getPrototypeOf(buyer), Object.getOwnPropertyDescriptors(buyer));
        await obj.update();
        setBuyer(obj);
        if(!obj.error){
          handleClose();
        }
      }
      else{
        const invalid=await buyer.verifyPassword();
        if(invalid){
          return;
        }
        handleClose();
        const OTPService=new phoneOTP(buyer.phone,buyer.token,buyer.googleId,socket);
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
  if(buyer){
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
        <Map currentLocation={buyer.coordinates} address={buyer.address} setAddress={setAddress} startDropDown={setStopDropDown} dropdown={stopDropDown}  show={showMAP} setShow={setShowMAP} setLocation={setLocation}/>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter your name"
              disabled={isDisabled}
              value={buyer.username}
              onChange={setUsername}
            />
          </Form.Group>
          <Form.Group className="mb-3">
          <Form.Label>Contact No.</Form.Label>
          <InputGroup>
          <InputGroup.Text>+880</InputGroup.Text>
          <Form.Control type="email" placeholder="Enter contact no." disabled={isDisabled} value ={buyer.phone} onChange={(e)=>setPhoneNumber(e.target.value)} />
          </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Home Address</Form.Label>
          <Form.Control type="address" placeholder="Address" value={buyer.address} onChange={(e)=>setAddress(e.target.value)} disabled={isDisabled} onClick={()=>isEditing && setShowMAP(true)}/>
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
          <InputGroup className="mb-3" controlId="formBasicPassword">
          {!buyer.googleId && isEditing &&(<a href={"changePassword/" + user._id} style={{marginLeft:"75%"}}>Change Password</a>)}
        </InputGroup>
        {isEditing && (
          <Button className="btn btn-outline-dark btn-save" disabled={isLocked} onClick={handleShow}>
            Save
          </Button>
        )}
      </Form>
      <ConfirmPasswordModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} error={buyer.errorMessage} passwordVisibility={{currentPasswordVisibility,setCurrentPasswordVisibility}} password={{password:buyer.password,setPassword:setPassword}}/>
      <PhoneVerify user={{user:buyer,setUser:setBuyer}} otpHandler={{otpHandler:otpHandler,setOTPHandler:setOTPHandler}} show={{show:showPhoneVerify,handleClose:handleClosePhoneVerify}} socket={socket}/>
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
