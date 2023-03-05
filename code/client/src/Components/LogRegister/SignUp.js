import { Container, Card, Form, Button, InputGroup,ToggleButton,ButtonGroup } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { setLogin,setSignUpPhone} from "./loginRedux/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';
import CryptoJS from 'crypto-js';

import {
  Envelope,
  Lock,
  Calendar2,
  EyeFill,
  EyeSlashFill,
  Person
} from "react-bootstrap-icons";

const SignUp = () => {
  const [radioValue, setRadioValue] = useState('1');
  const [radioName, setRadioName] = useState("Buyer");
  const radios = [
    { name: "Buyer", value: '1' },
    { name: "Seller", value: '2' },
  ];
  const [isLocked,setisLocked]=useState(true);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCFPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [password_eyeSlash, eyeSlash] = useState(false);
  const [error, setError] = useState(null);
  const [dob, setDOB] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword]=useState("");
  const [errorCPassword,setErrorCPassword]=useState("");
  const [confirmPassword_eyeSlash, cpeyeSlash] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =useState("password");
  useEffect(()=>{
    if(password!=="" && confirmPassword!=="" && username!=="" && email!=="" && dob!=="" && errorEmail==="" && errorPassword==="" && errorCPassword===""){
      setisLocked(false);
    }
    else{
      setisLocked(true);
    }
  },[password,username,email,confirmPassword,dob,errorEmail,errorPassword,errorCPassword])

  useEffect(()=>{
    const fetchUsers = async ()=>{
      const response = await fetch('api/signup/email/'+email);
      if(response.ok){
        setErrorEmail('account already exists with email');
      }
    }
    if(!errorEmail)fetchUsers();
  },[email,errorEmail])
  const changePassword = () => {
    if (passwordVisibility === "password") {
      setPasswordVisibility("text");
    } else {
      setPasswordVisibility("password");
    }
    eyeSlash(password_eyeSlash ^ true);
  };
  const emailChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if(!regex.test(sanitizedValue) && sanitizedValue!=="") {
      setErrorEmail('Not a valid email');
    }
    else{
      setErrorEmail('');
    }
    setEmail(sanitizedValue);
  };
  const passwordChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setPassword(sanitizedValue);
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{8,}$/;
    if(!regex.test(event.target.value) || event.target.value.length<8){
      if(sanitizedValue!==""){
        setErrorPassword('Password must be at least 8 characters with numbers, symbols and letters of upper case and lower case');
      }
      else {
        setErrorPassword("");
      }
    }
    else if(sanitizedValue!==confirmPassword){
      setErrorCPassword("passwords do not match");
      setErrorPassword("");
    }
    else{
      setErrorPassword("");
    }
  };
  const radioChange = (event) => {
    setRadioValue(event.target.value);
    if(event.target.value==='1'){
      setRadioName('Buyer');
    }
    else{
      setRadioName('Seller');
    }
  }
  const confirmPasswordChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setCFPassword(sanitizedValue);
    if(password===event.target.value) {
      setErrorCPassword("");
    }
    else{
      if(sanitizedValue!==""){
        setErrorCPassword("passwords do not match");
      }
      else{
        setErrorCPassword("");
      }
    }
  };
  const usernameChange = (event)=>{
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setUsername(sanitizedValue);
  }

  const dobChange =(event)=>{
    setDOB(event.target.value);
  }
  const changeCPassword = () => {
    if (confirmPasswordVisibility === "password") {
      setConfirmPasswordVisibility("text");
    } else {
      setConfirmPasswordVisibility("password");
    }
    cpeyeSlash(confirmPassword_eyeSlash ^ true);
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() - 13);
  const maxDateString = maxDate.toISOString().split('T')[0];
  const handleSubmit = async (e) =>{
    e.preventDefault();
    const user={userType:radioName,username:username,email:email,password:CryptoJS.SHA512(password).toString(),dob:dob};
    console.log(user);
    const response = await fetch('api/signup',{
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      },
    })
    const json=await response.json();
    if(!response.ok){
      setError(json.error);
    }else{
      console.log('signed up successfully');
      dispatch(setSignUpPhone(json._id));
    }
  }
  return (
    <Container style={{marginTop:'12%',width:'33%'}}>
      <Card className="mt-5 float-end"  style={{ maxWidth: '100%' }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>SignUp</Card.Title>
          <Card.Text>
            <Form onSubmit={handleSubmit}>
            <Form.Group controlId="errorMessageEmail">
                <p style={{color:"red"}}>{error}</p>
              </Form.Group>
              <Form.Group controlId="UserType" style={{
                        marginLeft:'33%'
                      }}>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "primary" : "primary"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={radioChange}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Person color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="Username">
                  <Form.Control
                    type="text"
                    required
                    placeholder="Username"
                    className="float-end"
                    style={{paddingLeft:'75px',paddingRight:'75px'}}
                    value={username}
                    onChange={usernameChange}
                  />
                </Form.Group>
              </InputGroup>
              <Form.Group controlId="errorMessageEmail">
                <p style={{color:"red"}}>{errorEmail}</p>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Envelope color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="Email">
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email"
                    className="float-end"
                    style={{paddingLeft:'75px',paddingRight:'75px'}}
                    value={email}
                    onChange={(e) => emailChange(e)}
                  />
                </Form.Group>
              </InputGroup>
              <Form.Group controlId="errorPassword" style={{overflowWrap:'anywhere'}}>
                <p style={{color:"red"}}>{errorPassword}</p>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="Password">
                  <Form.Control
                    type={passwordVisibility}
                    placeholder="Password"
                    required
                    className="float-end"
                    onChange={passwordChange}
                    value={password}
                    style={{paddingLeft:'65px',paddingRight:'65px'}}
                  />
                </Form.Group>
                <InputGroup.Text>
                  {(password_eyeSlash && (
                    <EyeFill color="#3354a9" onClick={changePassword} />
                  )) ||
                    (!password_eyeSlash && (
                      <EyeSlashFill color="#3354a9" onClick={changePassword} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
              <Form.Group controlId="errorCPassword" > 
                <p style={{color:"red"}}>{errorCPassword}</p>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="ConfirmPassword">
                  <Form.Control
                    type={confirmPasswordVisibility}
                    placeholder="Confirm Password"
                    required
                    className="float-end"
                    value={confirmPassword}
                    onChange={confirmPasswordChange}
                    style={{paddingLeft:'65px',paddingRight:'65px'}}
                  />
                </Form.Group>
                <InputGroup.Text>
                  {(confirmPassword_eyeSlash && (
                    <EyeFill color="#3354a9" onClick={changeCPassword} />
                  )) ||
                    (!confirmPassword_eyeSlash && (
                      <EyeSlashFill color="#3354a9" onClick={changeCPassword} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Calendar2 color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="DOB">
                  <Form.Control
                    type="date"
                    required
                    className="float-end"
                    style={{paddingLeft:'100px',paddingRight:'100px'}}
                    value={dob}
                    onChange={dobChange}
                    max={maxDateString}
                  />
                </Form.Group>
              </InputGroup>
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                style={{
                  marginLeft:'40%'
                }}
                disabled={isLocked}
              >
                SignUp
              </Button>
              <hr />
              <Form.Group controlId="LoginWithGoogle">
                <Button variant="outline-primary" size="lg" style={{marginLeft:'30%'}}>
                  <FaGoogle />
                </Button>
                <Button variant="outline-primary" size="lg" className="mx-5">
                  <FaFacebook />
                </Button>
              </Form.Group>
            </Form>
            <div className="existingAccount landingText">
              Already have an account?
              <Link
                to="/"
                style={{ color: "#3354a9" }}
                onClick={() => dispatch(setLogin())}
              >
                LOG IN!
              </Link>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
