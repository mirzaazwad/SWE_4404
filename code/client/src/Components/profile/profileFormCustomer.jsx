import axios from "axios";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setBuyerUser } from "../../Contexts/action";
import CryptoJS from "crypto-js";
import PhoneVerify from "./PhoneVerification/phoneVerify";
import Map from "../partials/Map/map";
import ConfirmPasswordModal from "./confirmPasswordModal";

const ProfileFormCustomer = (id) => {
  const _id = id;
  const buyer = useSelector((state) => state.userState.buyerState);
  const user = id.user;
  const socket=id.socket;
  const dispatch = useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked, setisLocked] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [error,setError]=useState("");
  const [currentPasswordVisibility, setCurrentPasswordVisibility] =useState(false);
  const [password, setPassword] = useState(null);
  const [loaded,setLoaded] = useState(false);
  const [showPhoneVerify,setShowPhoneVerify]=useState(false);
  const [phoneNumberChanged,setPhoneNumberChanged] = useState(false);
  const [address,setAddress]=useState("");
  const [location,setLocation]=useState(null);
  const [showMAP,setShowMAP]=useState(false);
  const [stopDropDown,setStopDropDown]=useState(false);
  const handleClosePhoneVerify=()=>{
    setShowPhoneVerify(false);
  }
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = (e) => {
    if(user.googleId){
      handleSubmit(e);
    }
    else{
      setShow(true);

    }
  }
  useEffect(() => {
    setUsername(buyer.username);
    setPhone(buyer.phone);
    setAddress(buyer.address);
    setLocation(buyer.coordinates);
    setLoaded(true);
  }, [buyer]);

  const turnOnEdit = (data) => {
    setIsDisabled(false);
    setIsEditing(data);
  };

  const turnOffEdit = () => {
    setIsDisabled(true);
    setIsEditing(false);
  };

  const verify = async (_id,password) => {
    const result=await axios.post("/api/profile/user/verify", {_id,password}, {
      headers: {
        Authorization: `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email',
      },
    }).then((result)=>{
      return result.data.success;
    }).catch((error)=>{
      return error.response.data.success;
    })
    return result;
  };

  const setPhoneNumber=(phone)=>{
    setPhoneNumberChanged(true);
    if(phone.length!==11){
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
    if(!user.googleId){
      await verify(_id.id,CryptoJS.SHA512(password).toString());
    }
    if(user.googleId || await verify(_id.id,CryptoJS.SHA512(password).toString())){
      if(!phoneNumberChanged){
        await axios
      .patch(
        "/api/profile/user/updateUser/" + _id.id,
        {
          username: username,
          address:address,
          coordinates: location
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'idType':user.googleId?'google':'email',
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
            'idType':user.googleId?'google':'email',
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
        <div className="error" style={{color:"red"}}>{error}</div>
        <Map currentLocation={location} address={address} setAddress={setAddress} startDropDown={setStopDropDown} dropdown={stopDropDown}  show={showMAP} setShow={setShowMAP} setLocation={setLocation}/>
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
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Home Address</Form.Label>
          <Form.Control type="address" placeholder="Address" value={address} onChange={(e)=>setAddress(e.target.value)} disabled={true}/>
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
        {isEditing && (<Button onClick={()=>setShowMAP(true)}>Add/Change Location Information</Button>)}
          {!buyer.googleId && isEditing &&(<a href={"changePassword/" + user._id} style={{marginLeft:"75%"}}>Change Password</a>)}
        </InputGroup>
        {isEditing && (
          <Button className="btn btn-outline-dark btn-save" disabled={isLocked} onClick={handleShow}>
            Save
          </Button>
        )}
      </Form>
      <ConfirmPasswordModal show={show} handleClose={handleClose} handleSubmit={handleSubmit} error={error} passwordVisibility={{currentPasswordVisibility,setCurrentPasswordVisibility}} password={{password,setPassword}}/>
      <PhoneVerify _id={_id.id} user={user} data={{email:buyer.email,phone:phone,username:username,address:address,coordinates:location}} show={showPhoneVerify} handleClose={handleClosePhoneVerify} socket={socket}/>
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
