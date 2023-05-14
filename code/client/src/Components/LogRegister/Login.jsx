import { Card, Form, Button,InputGroup } from "react-bootstrap";
import { Envelope, EyeFill, Lock ,EyeSlashFill, Google} from "react-bootstrap-icons";
import { Link } from "react-router-dom";
import {useState } from "react";
import { useLogin } from "../../Hooks/useLogin";
import '../../boxicons-2.1.4/css/boxicons.min.css';
import { useLoginGoogle } from "../../Hooks/useLoginGoogle";


const Login = () => {
  const [errorMessage,setError]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");
  const {login,isLoading,error}=useLogin();
  const [passwordVisibility,setPasswordVisibility] = useState(false);
  const {googleLogin,errorGoogle,isLoadingGoogle}=useLoginGoogle();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    await login(email,password);
    setError(error);
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
                  <span>{errorMessage}</span>
                  <span>{errorGoogle}</span>
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
                size="md" disabled={isLoading||isLoadingGoogle}>Login</Button>
              </div>
              
                <hr />
                <Form.Group controlId="LoginWithGoogle" className="d-flex justify-content-around">
                <Button className="btn-login me-3" size="sm" onClick={()=>googleLogin() } style={{width:"100%"}} disabled={isLoading||isLoadingGoogle}>
                <text style={{fontSize:"16px",marginRight:"10px"}}>Login With</text>
                <Google/>
                </Button>
              </Form.Group>
              
            </Form>
            <div className="noExistingAccount landingText" style={{textAlign: 'center'}}>
              <span>Don't have an account?</span>
            <Link
                to='/signup'
                style={{
                  all: "unset",
                  color: "#3354a9",
                  textDecoration: "underline",

                }}
              >
                <span>REGISTER NOW!</span>
            </Link>
            </div>
            <div className="forgotPassword landingText" style={{textAlign: 'center'}}>
              <Link
                to='/forgotPassword'
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
