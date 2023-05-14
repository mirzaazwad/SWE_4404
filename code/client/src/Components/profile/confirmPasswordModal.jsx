import { Button, Form, InputGroup, Modal } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";

const ConfirmPasswordModal = ({show,handleClose,handleSubmit,passwordVisibility,password,error}) => {
  return (
    <Modal show={show} onHide={handleClose}>
                  <Form onSubmit={handleSubmit}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter password to confirm changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                <div className="errorMessageShow" style={{color:"red"}}>{error}</div>
                  <Form.Group className="mb-3" controlId="enterPassword">
            
            <Form.Label>Enter Password</Form.Label>
            <InputGroup>
            <Form.Control  type={passwordVisibility.currentPasswordVisibility?"text":"password"} placeholder="Password" value={password.password}  onChange={(e)=>password.setPassword(e.target.value)}/>                 
            <InputGroup.Text>
                    {(passwordVisibility.currentPasswordVisibility && (
                      <EyeFill color="#3354a9" onClick={()=>passwordVisibility.setCurrentPasswordVisibility(false)} />
                    )) ||
                      (!passwordVisibility.currentPasswordVisibility && (
                        <EyeSlashFill color="#3354a9" onClick={()=>passwordVisibility.setCurrentPasswordVisibility(true)} />
                      ))}
                  </InputGroup.Text>
                  </InputGroup>
          </Form.Group>
                 
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </Modal.Footer>
                  </Form>
              </Modal>
    );
}
 
export default ConfirmPasswordModal;