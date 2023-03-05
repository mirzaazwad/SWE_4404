import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import 'react-phone-number-input/style.css';
import { useSelector } from "react-redux";

const PhoneNumber = () => {

  const id=useSelector((state) => state.loginState.id);
  console.log(id);
  const [value,setValue]=useState("");
  const [error,setError] = useState("");
  const handleSubmit=async (e)=>{
    const user={phone:value}
    e.preventDefault();
    const response = await fetch('api/signup/phone/'+id,{
      method: 'PATCH',
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
    }
  }

  const setPhoneNumber = (event) => {
    setValue(event);
  };

  return (
    <div className="PhoneNumber">
      <Container
        className="login-container"
        style={{ marginTop: "1%", width: "33%" }}
      >
        <Card className="d-flex float-end" style={{ maxWidth: "100%" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>Register Phone Number</Card.Title>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <div style={{color:"red"}}>Currently our service works for Bangladesh only</div>
                </Form.Group>
                <Form.Group>
                  <div style={{color:"red"}}>{error}</div>
                </Form.Group>
                <InputGroup className="mt-3 mb-3">
                  <Form.Group controlId="phoneNumber">
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="BD"
                      value={value}
                      style={{paddingLeft:'75px',paddingRight:'75px'}}
                      onChange={setPhoneNumber}
                    />
                  </Form.Group>
                </InputGroup>

                <Button
                  type="submit"
                  variant="outline-primary"
                  size="sm"
                  style={{
                    marginLeft: "40%",
                  }}
                >
                  Verify
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PhoneNumber;
