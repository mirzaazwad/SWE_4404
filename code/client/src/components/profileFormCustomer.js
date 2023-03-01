import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../index.css";
import "../boxicons-2.1.4/css/boxicons.min.css";


function profileFormCustomer() {
  return (
    <div>
    <div className="profileInfo d-flex justify-content-between">
      <h3 className="InfoHeader mb-4">Personal Information</h3>
      <button className="btn btn-outline-dark btn-editProfile">Edit Profile
      <i class='bx bx-cog bx-sm' ></i></button>
    </div>
    <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Name</Form.Label>
        <Form.Control type="pharmacyName" placeholder="Enter name of your pharmacy" disabled/>
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
    </div>
  );
}

export default profileFormCustomer;