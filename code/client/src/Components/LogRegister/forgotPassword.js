import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import NavbarLanding from '../partials/landing/navbarLanding';
import { InputGroup } from 'react-bootstrap';
import {EyeFill,EyeSlashFill, Envelope} from "react-bootstrap-icons";
import { useEffect, useState } from "react";
import axios from 'axios';
import CryptoJS from 'crypto-js';

const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error,setError] = useState("");
  const onEmailChange = (e) => {
    setEmail(e.target.value);
  }
    const handleSubmit = async(e) =>{
      e.preventDefault();
      if (await verify()) {
        console.log("EMail found.");
        return;
      }
      setError("account does not exist");
    }
    
    const verify = async() =>{
      const user={email:email};
      const response = await fetch('http://localhost:4000/api/forgotPassword/', {
        method: 'POST',
        body: JSON.stringify(user),
        headers:{
          'Content-Type': 'application/json'
        },
      })
      if(response.ok){
        console.log("ok");
        return true;
      }
      else{
        console.log(email);  
        console.log("Email is incorrect");
        return false;
      }
    }



    return ( 
        <div>
            <NavbarLanding/>
            <section className='d-flex justify-content-center'>
            <Card className='forgotPasswordCard'>
        <Card.Header className='' style={{textAlign: "center", fontSize: "20px"}}><b>Forgot Password</b></Card.Header>
        <Card.Body>
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
                      onChange={onEmailChange}
                    />
                   </InputGroup>
                  </Form.Group>

                  <div className='d-flex justify-content-center'>
        <Button variant="primary" type="submit" >
          Send Recovery Email
        </Button>
        </div>
      </Form>
        </Card.Body>
      </Card>
      </section>
        </div>   
     );
}
 
export default ForgotPassword;