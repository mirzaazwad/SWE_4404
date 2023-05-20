import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import OtpInput from "react18-input-otp";
import { useState } from 'react';
import OTPValidityTimer from "../../LogRegister/OTPTimer";
import phoneOTP from "../../../Library/OTPHandler/otpPhone";

const PhoneVerify = ({user,otpHandler,show,socket}) => {
  const [error,setError]=useState("");
  const [disabled,setDisabled]=useState(false);
  const [disabledResend,setDisabledResend]=useState(true);
  const [otp,setOTP]=useState("");

  const handleSubmit=async()=>{
    setDisabled(true);
    let otpObject=Object.create(Object.getPrototypeOf(otpHandler.otpHandler), Object.getOwnPropertyDescriptors(otpHandler.otpHandler));
    otpObject.otp=otp;
    const result=await otpObject.verifyOTP();
    if(result){
      let obj = Object.create(Object.getPrototypeOf(user.user), Object.getOwnPropertyDescriptors(user.user));
      await obj.update();
      user.setUser(obj);
      show.handleClose();
      setDisabled(false);
      setDisabledResend(true);
    }
    else{
      setError("OTP is incorrect");
      setDisabledResend(false);
      setDisabled(true);
    }
  }

  const handleTimerExpire=()=>{
    setDisabled(true);
    setDisabledResend(false);
  }

  const handleResend=async()=>{
    setDisabled(false);
    otpHandler.setOTPHandler(new phoneOTP(otpHandler.otpHandler.phone,user.user.token,user.user.googleId,socket));
    const result=await otpHandler.otpHandler.sendOTP();
    if(!result){
      setError("OTP could not be sent due to technical issues");
    }
  }

  return (
    <Modal show={show.show} onHide={show.handleClose}>
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
        <Button variant="primary" onClick={handleSubmit} disabled={otp.length!==6 || disabled}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PhoneVerify;
