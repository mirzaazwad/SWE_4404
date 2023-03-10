import { Container, Card, Form, Button,InputGroup } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Envelope, EyeFill, Lock ,EyeSlashFill} from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { setSignUp } from "../../Contexts/loginRedux/action";
import { Link } from "react-router-dom";
import CryptoJS from 'crypto-js';
import { useState } from "react";
import '../../boxicons-2.1.4/css/boxicons.min.css';
const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const [error,setError]=useState("");
  const dispatch = useDispatch();
  const [passwordVisibility,setPasswordVisibility] = useState(false);
  const handleSubmit = async (e) =>{
    e.preventDefault();
    if(await login("seller")){
      setError("");
      return;
    }
    if(await login("buyer")){
      setError("");
      return;
    }
    setError("account does not exist");
  }

  const login = async(type) =>{
    const user={email:email,password:CryptoJS.SHA512(password).toString()};
    const response = await fetch('api/'+type+'/login',{
      method: 'POST',
      body: JSON.stringify(user),
      headers:{
        'Content-Type': 'application/json'
      },
    })
    const json=await response.json();
    if(response.ok){
      if(type==="seller"){
        window.location.href="/profileSeller/"+json.id;
      }
      else{
        window.location.href="/profileBuyer/"+json.id;
      }
      return true;
    }
    else{
      return false;
    }
  }
  return (
      <div className="login-container"  style={{ marginTop: '15%' }}>
        <Card className="d-flex justify-items-center w-75" >
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Login</Card.Title>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <div className="errorMessage" style={{color:"red"}}>
                    {error}
                  </div>
                </Form.Group>

                  <Form.Group controlId="Email" className="w-100">
                  <InputGroup className="mt-3 mb-3">
                  <InputGroup.Text><Envelope color="#3354a9" /></InputGroup.Text>
                    <Form.Control
                      type="email"
                      required
                      placeholder="Email"
                      className="float-start"
                      value={email}
                      
                      onChange={(e)=>setEmail(e.target.value)}
                    />
                   </InputGroup>
                  </Form.Group>


                  <Form.Group controlId="Password" className="w-100 h-50">
                  <InputGroup className="mt-3 mb-3" size="sm">
                  <InputGroup.Text><Lock color="#3354a9" /></InputGroup.Text>
                    <Form.Control
                      type={passwordVisibility?"text":"password"}
                      placeholder="Password"
                      required
                      className="float-end"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      
                    />
                    <InputGroup.Text>{(passwordVisibility && <EyeFill color="#3354a9" onClick={(e)=>setPasswordVisibility(false)} />) || (!passwordVisibility && <EyeSlashFill color="#3354a9" onClick={(e)=>setPasswordVisibility(true)} />)}</InputGroup.Text>
                </InputGroup>
                  </Form.Group>

                <div className="d-flex justify-content-center">
                <Button className="btn btn-login"
                  type="submit"
                  size="md">Login</Button>
                </div>
                
                  <hr />
                  <div className="d-flex justify-content-around">
                  <Form.Group controlId="LoginWithGoogle">
                  <Button className="btn-login me-3" size="lg" >
                  <i class='bx bxl-google'></i>
                  </Button>
                  <Button className="btn-login " size="lg">
                  <i class='bx bxl-facebook-circle'></i>
                  </Button>
                </Form.Group>
                  </div>
                
              </Form>
              <div className="noExistingAccount landingText" style={{textAlign: 'center'}}>
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
              <div className="forgotPassword landingText" style={{textAlign: 'center'}}>
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
      </div>
  );
}

export default Login;
