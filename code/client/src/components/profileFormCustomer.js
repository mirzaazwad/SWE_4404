import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../index.css";


function profileFormCustomer() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Pharmacy Name</Form.Label>
        <Form.Control type="pharmacyName" placeholder="Enter name of your pharmacy" disabled/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name of owner</Form.Label>
        <Form.Control type="ownerName" placeholder="Enter name of the owner" disabled />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Contact No.</Form.Label>
        <Form.Control type="email" placeholder="Enter contact no." disabled />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Address</Form.Label>
        <Form.Control type="address" placeholder="Address" disabled />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email"  disabled/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" disabled/>
        
      </Form.Group>
      
      
    </Form>
  );
}

export default profileFormCustomer;