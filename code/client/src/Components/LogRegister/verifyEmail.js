import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import NavbarLanding from '../partials/landing/navbarLanding';
import {EyeFill,EyeSlashFill, Envelope} from "react-bootstrap-icons";
import { InputGroup } from 'react-bootstrap';
import OtpInput from 'react18-input-otp';
import { useEffect, useState } from "react";
import axios from 'axios';
import 'bootstrap';
import '../../index.css';
import './styledVerify.css';
import { useParams } from 'react-router-dom';
import OTPValidityTimer from './OTPTimer';

const EmailVerification = () => {
    const {email}=useParams();
    const [otp,setOTP]=useState("");
    const [errorMessage,setErrorMessage]=useState("");
    const [isDisabled,setIsDisabled]=useState(false);
    const [error,setError]=useState(true);

    // useEffect(()=>{
    //   axios.get('/api/verifyEmail/'+email).then((result)=>{
    //     console.log(result);
    //   })
    //   .catch(err=>setError(err.error));
    // },[email]);



    const handleSubmit = async() =>{
      await axios.post('/api/')
    }


    const resend = () =>{
      window.location.reload();
    }

    return ( 
        <div>
            <NavbarLanding/>
            <section className='d-flex justify-content-center'>
            <Card className='forgotPasswordCard'>
        <Card.Header className=''><Envelope style={{color:"#3354a9",paddingRight:'5px',fontSize:'30px',marginBottom:'1.25%'}} /><b style={{textAlign: "center", fontSize: "20px"}}>Verify Email Account</b></Card.Header>
        <Card.Body>
        <div className="verifyDiv">
      <p className="p2">
        An OTP has been sent to your entered email {email}
      </p>
      <div className="otpElements">
        <p className="p3">Enter your Code here</p>
        <div className="otp">
          <OtpInput
            onChange={setOTP}
            value={otp}
            inputStyle="inputStyle"
            numInputs={6}
            separator={<span></span>}
          />
        </div>
        <p>OTP is valid for: <OTPValidityTimer validityPeriodInSeconds={10} onTimerExpired={()=>console.log('timer expired')}/></p>
        
      </div>
      <div style={{marginBottom:'2%'}}><p className="p3">Didn't receive the code?</p></div>
      <Button  variant="primary" disabled={isDisabled}  style={{float:'left'}} onClick={resend}>Resend</Button>
      <Button variant="primary" disabled={isDisabled} style={{float:'right'}}>
          Verify
        </Button>

    </div>
        </Card.Body>
      </Card>
      </section>
        </div>   
     );
}
 
export default EmailVerification;
