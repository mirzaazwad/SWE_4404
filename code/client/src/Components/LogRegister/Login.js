import { Container, Card, Form, Button,InputGroup } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Envelope, EyeFill, Lock ,EyeSlashFill} from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { setSignUp } from "./loginRedux/action";
import { Link } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { useState } from "react";
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const dispatch = useDispatch();
  const [passwordVisibility,setPasswordVisibility] = useState("password");
  const [password_eyeSlash,eyeSlash]=useState(false);
  const changePassword = () =>{
    if(passwordVisibility==="password"){
      setPasswordVisibility("text");
    }
    else{
      setPasswordVisibility("password");
    }
    eyeSlash(password_eyeSlash^true);
  }
  const handleSubmit = async(e) =>{
    e.preventDefault();
    const user={email:email,password:CryptoJS.SHA512(password).toString()};
    console.log(user);
    const response = await fetch('api/login',{
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      },
    })
    const json=await response.json();
    if(!response.ok){
      console.log('login failed');
      setError(json.error);
    }else{
      if(json.success===false){
        console.log('login failed');
        setError(json.error);
      }
      console.log('logged in successfully');
    }
  }
  return (
    <div className="loginPage">
      <Container className="login-container"  style={{ marginTop: '5%' }}>
        <Card className="d-flex float-end" style={{ maxWidth: '50%' }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Login</Card.Title>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <div className="errorMessage" style={{color:"red"}}>
                    {error}
                  </div>
                </Form.Group>
                <InputGroup className="mt-3 mb-3">
                  <InputGroup.Text><Envelope color="#3354a9" /></InputGroup.Text>
                  <Form.Group controlId="Email">
                    <Form.Control
                      type="email"
                      required
                      placeholder="Email"
                      className="float-end"
                      value={email}
                      style={{ paddingLeft: '75px', paddingRight: '75px' }}
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                  </Form.Group>
                </InputGroup>
                <InputGroup className="mt-3 mb-3" size="sm">
                  <InputGroup.Text><Lock color="#3354a9" /></InputGroup.Text>
                  <Form.Group controlId="Password">
                    <Form.Control
                      type={passwordVisibility}
                      placeholder="Password"
                      required
                      className="float-end"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      style={{ paddingLeft: '65px', paddingRight: '65px' }}
                    />
                  </Form.Group>
                  <InputGroup.Text>{(password_eyeSlash && <EyeFill color="#3354a9" onClick={changePassword} />) || (!password_eyeSlash && <EyeSlashFill color="#3354a9" onClick={changePassword} />)}</InputGroup.Text>
                </InputGroup>

                <Button
                  type="submit"
                  variant="outline-primary"
                  size="sm"
                  style={{
                    marginLeft: '40%'
                  }}
                >
                  Login
              </Button>
                <hr />
                <Form.Group controlId="LoginWithGoogle">
                  <Button variant="outline-primary" size="lg" style={{ marginLeft: '30%' }}>
                    <FaGoogle />
                  </Button>
                  <Button variant="outline-primary" size="lg" className="mx-5">
                    <FaFacebook />
                  </Button>
                </Form.Group>
              </Form>
              <div className="noExistingAccount landingText">
                Don't have an account?
              <Link
                  to='/'
                  style={{
                    all: "unset",
                    color: "#3354a9",
                    textDecoration: "underline",
                  }}
                  onClick={() => dispatch(setSignUp())}
                >
                  REGISTER NOW!
              </Link>
              </div>
              <div className="forgotPassword landingText">
                <Link
                  to='/'
                  style={{
                    all: "unset",
                    color: "#3354a9",
                    textDecoration: "underline",
                  }}
                >
                  FORGOT PASSWORD?
              </Link>
              </div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default Login;
