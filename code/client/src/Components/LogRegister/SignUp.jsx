import {Card,Form,Button,InputGroup,ToggleButton,ButtonGroup} from "react-bootstrap";
import { useState } from "react";
import { Link } from "react-router-dom";
import {emailAuth,passwordAuth,confirmPasswordAuth,userNameAuth,} from "../../Authentication/Auth";
import {Envelope,Lock,EyeFill,EyeSlashFill,Person, Google,} from "react-bootstrap-icons";
import '../../boxicons-2.1.4/css/boxicons.min.css';
import { useSignUp } from "../../Hooks/useSignUp";
import { useGoogleSignUp } from "../../Hooks/useGoogleSignUp";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorCPassword] = useState("");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =useState(false);
  const {signup,error,isLoading}= useSignUp();
  const [radioName,setRadioName]=useState('buyer');
  const {googleSignUp,errorGoogle,isLoadingGoogle}=useGoogleSignUp(radioName);

  const emailChange = (event) => {
    const result = emailAuth(event.target.value);
    setEmail(result.email);
    if (result.error) setErrorEmail("Not valid email");
    else setErrorEmail("");
  };

  const passwordChange = (event) => {
    const passwordValidation = passwordAuth(event.target.value);
    const confirmPasswordValidation = confirmPasswordAuth(confirmPassword);
    setErrorPassword(passwordValidation.error);
    setPassword(passwordValidation.password);
    setErrorCPassword(confirmPasswordValidation.error);
  };

  const confirmPasswordChange = (event) => {
    const confirmPasswordValidation = confirmPasswordAuth(
      password,
      event.target.value
    );
    setErrorCPassword(confirmPasswordValidation.error);
    setConfirmPassword(confirmPasswordValidation.confirmPassword);
  };

  const radioChange = (e) =>{
    setRadioName(e.target.value);
  }

  
  const handleSubmit =async (e) =>{
    e.preventDefault();
    await signup(radioName==='buyer'?'buyer':'seller',username,email,password);
  }

  return (
    <div className="signup-container" style={{ marginTop: "10%" }}>
      <Card className="w-75" style={{ maxWidth: "100%" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>SignUp</Card.Title>
          <Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="errorMessageEmail">
                <span style={{ color: "red" }}>{error}</span>
              </Form.Group>
              <Form.Group
                controlId="UserType"
              >
                <div className="d-flex justify-content-center w-100" >
                <ButtonGroup className="singUp-button ">
                    <ToggleButton
                      id={'buyer'}
                      type="radio"
                      variant={radioName === 'buyer'?"primary":"outline-primary"}
                      name="buyer"
                      value={'buyer'}
                      checked={radioName === 'buyer'}
                      onChange={radioChange}
                    >
                      buyer
                    </ToggleButton>
                    <ToggleButton
                      id={'seller'}
                      type="radio"
                      variant={radioName === 'seller'?"primary":"outline-primary"}
                      name="seller"
                      value={'seller'}
                      checked={radioName === 'seller'}
                      onChange={radioChange}
                    >
                      seller
                    </ToggleButton>
                </ButtonGroup>
                </div>
                
              </Form.Group>

                <Form.Group controlId="Username" className="w-100">
                <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Person color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Username"
                    className="float-end"
                    value={username}
                    onChange={(e)=>setUsername(userNameAuth(e.target.value))}
                  />
              </InputGroup>
                </Form.Group>
              <Form.Group controlId="errorMessageEmail">
                <span style={{ color: "red" }}>{errorEmail}</span>
              </Form.Group>

                <Form.Group controlId="Email" className="w-100">
                <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Envelope color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email"
                    className="float-end"
                    value={email}
                    onChange={emailChange}
                  />
              </InputGroup>
                </Form.Group>
              <Form.Group
                controlId="errorPassword"
                style={{ overflowWrap: "anywhere" }}
              >
                <span style={{ color: "red" }}>{errorPassword}</span>
              </Form.Group>

                <Form.Group controlId="Password" className="w-100">
                <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type={passwordVisibility?"text":"password"}
                    placeholder="Password"
                    required
                    className="float-end"
                    onChange={passwordChange}
                    value={password}
                  />
                <InputGroup.Text>
                  {(passwordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setPasswordVisibility(false)} />
                  )) ||
                    (!passwordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
                </Form.Group>
              <Form.Group controlId="errorConfirmPassword" className="w-100">
                <span style={{ color: "red" }}>{errorConfirmPassword}</span>
              </Form.Group>
                <Form.Group controlId="ConfirmPassword">
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type={confirmPasswordVisibility?"text":"password"}
                    placeholder="Confirm Password"
                    required
                    className="float-end"
                    value={confirmPassword}
                    onChange={confirmPasswordChange}
                  />
                <InputGroup.Text>
                  {(confirmPasswordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setConfirmPasswordVisibility(false)} />
                  )) ||
                    (!confirmPasswordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setConfirmPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
                </Form.Group>
                <div className="d-flex justify-content-center">
              <Button className="btn btn-login align-content-center"
                type="submit"
                size="md"
                disabled={isLoading || isLoadingGoogle}
              >
                SignUp
              </Button>
              </div>
              <hr />
              <Form.Group controlId="errorGoogle" className="w-100">
                <span style={{ color: "red" }}>{errorGoogle}</span>
              </Form.Group>
              <Form.Group controlId="SignUpWithGoogle" className="d-flex justify-content-around">
                <div className="errorGoogle">
                  <span>{errorGoogle}</span>
                </div>
              <Button className="btn-login me-3" size="sm" onClick={()=>googleSignUp()} style={{width:"100%"}} disabled={isLoading||isLoadingGoogle}>
               <text style={{fontSize:"16px",marginRight:"10px"}}>Sign Up With</text>
                <Google/>
                </Button>
              </Form.Group>
            </Form>
            <div className="existingAccount landingText" style={{ textAlign: "center"  }}>
              Already have an account?
              <Link
                to="/"
                style={{ color: "#3354a9", textAlign: "center"  }}
              >
                LOG IN!
              </Link>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;