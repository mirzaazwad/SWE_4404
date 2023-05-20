import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import PhoneVerify from "./PhoneVerification/phoneVerify";
import Map from "../partials/Map/map";
import ConfirmPasswordModal from "./confirmPasswordModal";
import phoneOTP from "../../Library/OTPHandler/otpPhone";
import Loader from "../partials/loader";
import pharmacyManager from "../../Library/User/pharmacy-manager";

const ProfileFormPharmacy=({socket,user})=> {
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked , setisLocked] = useState(false);
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =useState(false);
  const [showPhoneVerify,setShowPhoneVerify]=useState(false);
  const [phoneNumberChanged,setPhoneNumberChanged] = useState(false);
  const [showMAP,setShowMAP]=useState(false);
  const [stopDropDown,setStopDropDown]=useState(false);
  const [otpHandler,setOTPHandler]=useState(null);
  const [seller,setSeller]=useState(null);
  const [error,setError]=useState("");

  useEffect(()=>{
    if(user instanceof pharmacyManager){
      setSeller(user);
    }
  },[user])

  const handleClosePhoneVerify=()=>{
    setShowPhoneVerify(false);
  }
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = async(e) => {
    if(seller.googleId){
      handleSubmit(e);
    }
    else{
      const validNumber=await seller.validatePhoneNumber();
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

  const setPharmacy=(e)=>{
    let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
    obj.pharmacy=e.target.value;
    setSeller(obj);
  }

  const setPhoneNumber=(phone)=>{
    setPhoneNumberChanged(true);
    if(phone.length!==11){
      setError("Phone Number Must be 11 digits");
    }
    else{
      setError("");
    }
    let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
    obj.phone=phone;
    setSeller(obj);
  }

  const setAddress=(address)=>{
    let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
    obj.address=address;
    setSeller(obj);
  }

  const setUsername=(e)=>{
    let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
    obj.username=e.target.value;
    setSeller(obj);
  }

  const setLocation=(coordinates)=>{
    let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
    obj.coordinates=coordinates;
    setSeller(obj);
  }

  const setPassword=(password)=>{
    let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
    obj.password=password;
    setSeller(obj);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    turnOffEdit();
    setisLocked(true);
    if(!seller.hasOwnProperty('coordinates')){
      setError("Location must be provided for pharmacy");
      return;
    }
    if(seller.googleId){
      if(!phoneNumberChanged){
        console.log(seller);
        let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
        await obj.update();
        console.log(obj);
        setSeller(obj);
        if(!obj.error){
          handleClose();
        }
      }
      else{
        handleClose();
        const OTPService=new phoneOTP(seller.phone,seller.token,seller.googleId,socket);
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
        let obj = Object.create(Object.getPrototypeOf(seller), Object.getOwnPropertyDescriptors(seller));
        await obj.update();
        setSeller(obj);
        if(!obj.error){
          handleClose();
        }
      }
      else{
        const invalid=await seller.verifyPassword();
        if(invalid){
          return;
        }
        handleClose();
        const OTPService=new phoneOTP(seller.phone,seller.token,seller.googleId,socket);
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

  if(seller){
    return (
      <div>
        <div className="profileInfo d-flex justify-content-between">
          <h4 className="InfoHeader mb-4">Personal Information</h4>
          <button className="btn btn-outline-dark btn-editProfile " onClick={()=>turnOnEdit(!isEditing)}>Edit Profile
          <i className='bx bx-cog bx-sm' ></i></button>
        </div>
        <Form>
        <Map currentLocation={seller.coordinates} address={seller.address} setAddress={setAddress} startDropDown={setStopDropDown} dropdown={stopDropDown}  show={showMAP} setShow={setShowMAP} setLocation={setLocation}/>
        <Form.Group className="mb-3">
            <Form.Label>Pharmacy Name</Form.Label>
            <Form.Control type="pharmacyName" placeholder="Enter name of your pharmacy" disabled={isDisabled} value={seller.pharmacy} onChange={setPharmacy}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name of Owner</Form.Label>
            <Form.Control type="ownerName" placeholder="Enter name of owner"  disabled={isDisabled} value = {seller.username} onChange={setUsername} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Contact No.</Form.Label>
            <InputGroup>
            <InputGroup.Text>+880</InputGroup.Text>
            <Form.Control type="email" placeholder="Enter contact no." disabled={isDisabled} value ={seller.phone} onChange={(e)=>setPhoneNumber(e.target.value)} />
            </InputGroup>
          </Form.Group>
          <div className="error" style={{color:"red"}}>{error}</div>
          <Form.Group className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control type="address" placeholder="Address" value={seller.address} onChange={(e)=>setAddress(e.target.value)} disabled={isDisabled} onClick={()=>{isEditing && setShowMAP(true)}}/>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email"   disabled={true} value = {seller.email} />
          </Form.Group>
         
          <InputGroup className="mb-3">
            {!seller.googleId && isEditing &&(<a href={"changePassword/" + seller._id} style={{marginLeft:"75%"}}>Change Password</a>)}
          </InputGroup>
          {isEditing && (
            <Button className="btn btn-outline-dark btn-save" disabled={isLocked} onClick={handleShow}>
              Save
            </Button>
          )}
        </Form> 
        <ConfirmPasswordModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} error={seller.errorMessage} passwordVisibility={{currentPasswordVisibility,setCurrentPasswordVisibility}} password={{password:seller.password,setPassword:setPassword}}/>
        <PhoneVerify user={{user:seller,setUser:setSeller}} otpHandler={{otpHandler:otpHandler,setOTPHandler:setOTPHandler}} show={{show:showPhoneVerify,handleClose:handleClosePhoneVerify}} socket={socket}/>
      </div>
    );
  }
  else{
    return(
      <Loader/>
    )
  }
}

export default ProfileFormPharmacy;