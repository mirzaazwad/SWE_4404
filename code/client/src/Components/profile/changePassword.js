import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import NavbarLanding from '../partials/landing/navbarLanding';
import { InputGroup } from 'react-bootstrap';
import {EyeFill,EyeSlashFill} from "react-bootstrap-icons";
import { useEffect, useState } from "react";

const ChangePassword = () => {
    const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(false);
    const [NewPasswordVisibility, setNewPasswordVisibility] = useState(false);
    const [confirmNewPasswordVisibility, setConfirmNewPasswordVisibility] = useState(false);
    return ( 
        <div>
            <NavbarLanding/>
            <section className='d-flex justify-content-center'>
            <Card className='changePasswordCard'>
        <Card.Header className='' style={{textAlign: "center", fontSize: "20px"}}><b>Change Password</b></Card.Header>
        <Card.Body>
        <Form>       
            <Form.Group className="mb-3" controlId="formBasicPassword">
            
            <Form.Label>Current Password</Form.Label>
            <InputGroup>
            <Form.Control  type={currentPasswordVisibility?"text":"password"} placeholder="Password" />                 
            <InputGroup.Text>
                    {(currentPasswordVisibility && (
                      <EyeFill color="#3354a9" onClick={()=>setCurrentPasswordVisibility(false)} />
                    )) ||
                      (!currentPasswordVisibility && (
                        <EyeSlashFill color="#3354a9" onClick={()=>setCurrentPasswordVisibility(true)} />
                      ))}
                  </InputGroup.Text>
                  </InputGroup>
          </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
            
          <Form.Label>New Password</Form.Label>
          <InputGroup>
          <Form.Control  type={NewPasswordVisibility?"text":"password"} placeholder="Password" />                 
          <InputGroup.Text>
                  {(NewPasswordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setNewPasswordVisibility(false)} />
                  )) ||
                    (!NewPasswordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setNewPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
                </InputGroup>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
            
          <Form.Label>Confirm New Password</Form.Label>
          <InputGroup>
          <Form.Control  type={confirmNewPasswordVisibility?"text":"password"} placeholder="Password" />                 
          <InputGroup.Text>
                  {(confirmNewPasswordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setConfirmNewPasswordVisibility(false)} />
                  )) ||
                    (!confirmNewPasswordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setConfirmNewPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
                </InputGroup>
        </Form.Group>
        <div className='d-flex justify-content-between'>
        <Button variant="primary" type="submit">
          Confirm
        </Button>
            <a href='#'>Back To Profile</a>
            </div>

      </Form>
      
        </Card.Body>
      </Card>
      </section>
        </div>

      
        
     );
}
 
export default ChangePassword;