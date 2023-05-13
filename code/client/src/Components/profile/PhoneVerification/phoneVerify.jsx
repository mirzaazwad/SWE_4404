import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import OtpInput from "react18-input-otp";
import { useState,useEffect } from 'react';
import OTPValidityTimer from "../../LogRegister/OTPTimer";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setBuyerUser,setSellerDetails,setSellerUser } from "../../../Contexts/action";

const PhoneVerify = (props) => {
  const user = props.user;
  const dispatch=useDispatch();
  const [show, setShow] = useState(props.show);
  const [otp,setOTP]=useState();
  const [error,setError]=useState("");
  const [disabled,setDisabled]=useState(false);
  const [disabledResend,setDisabledResend]=useState(true);
  const phone=props.data.phone;
  const _id=props._id;

  useEffect(()=>{
    setShow(props.show);
  },[props.show])

  const handleClose = () => {
    props.handleClose();
    setShow(!show);
  };

  const handleSubmit=async()=>{
    await axios.post('/api/mobile/OTPverify',{
      phone:phone,
      otp:otp
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(async (result)=>{
      if(!result.data.success){
        setError("OTP is invalid try again, a new OTP has been sent");
        await handleResend();
      }
      else{
      if(user.userType==="seller"){
        await axios
      .patch(
        "/api/profile/user/updateUser/" + _id,
        {
          username: props.data.username,
          phone: props.data.phone,
          address: props.data.address,
          coordinates:props.data.coordinates
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .then((result) => {
        handleClose();
        dispatch(setSellerUser(result.data));
      })
        await axios.patch('/api/profile/seller/'+props.data.email,{
          email:props.data.email,
          pharmacy:props.data.pharmacy
        },{headers: {
          'Authorization': `Bearer ${user.token}`
        }}).then((result)=>{
          console.log(result);
          handleClose();
          dispatch(setSellerDetails(result.data));
        });
      }
      else{
        await axios
      .patch(
        "/api/profile/user/updateUser/" + _id,
        {
          username: props.data.username,
          phone: props.data.phone,
          address: props.data.address,
          coordinates:props.data.coordinates
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
      }
    })
  }

  const handleTimerExpire=()=>{
    setDisabled(true);
    setDisabledResend(false);
  }

  const handleResend=async()=>{
    let OTP = Math.floor(100000 + Math.random() * 900000).toString();
    let currentDate=new Date();
    props.socket.emit('OTP',{phone:phone,otp:OTP,sendingTime:currentDate});
    await axios.post('/api/mobile/OTPsend',{
          phone:phone,
          otp:OTP,
          sendingTime:currentDate
        },{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        });
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Enter OTP for Phone Number Verification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="errorMessageShow" style={{ color: "red" }}>
          {error}
        </div>
        <div className="enterOTP">
          <p style={{textDecoration:"bold"}}>An OTP has been sent to verify your phone number, please provide the OTP before the timer ends</p>
        </div>
        <Form.Group className="mb-3" controlId="enterPassword">
          <InputGroup>
            <OtpInput
              onChange={setOTP}
              value={otp}
              inputStyle="inputStyle"
              numInputs={6}
              separator={<span></span>}
            />
          </InputGroup>
        </Form.Group>
        <p>OTP is valid for: <OTPValidityTimer validityPeriodInSeconds={120} onTimerExpired={handleTimerExpire}/></p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleResend} disabled={disabledResend}>
          Resend OTP
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={disabled}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PhoneVerify;
