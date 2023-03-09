import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../index.css";

function ProfileFormCustomer(props) {
  const user=props;
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const turnOnEdit = () => {
    setIsDisabled(false);
    setIsEditing(true);
  }
  const turnOffEdit = () => {
    setIsDisabled(true);
    setIsEditing(false);
  }

  return (
    <div>
      <div className="profileInfo d-flex justify-content-between">
        <h4 className="InfoHeader mb-4">Personal Information</h4>
        <button className="btn btn-outline-dark btn-editProfile " onClick={turnOnEdit}>Edit Profile
        <i class='bx bx-cog bx-sm' ></i></button>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="Name" placeholder="Enter your name"  disabled={isDisabled} value={user.data.username}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Contact No.</Form.Label>
          <Form.Control type="email" placeholder="Enter contact no." disabled={isDisabled}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="address" placeholder="Address" disabled={isDisabled}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  disabled={isDisabled}   value={user.data.email}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" disabled={isDisabled}/>
        </Form.Group>
      
        {isEditing && (
          <Button className="btn btn-outline-dark btn-save" type="submit" onClick={turnOffEdit}>
            Save
          </Button>
        )}</Form>
    </div>
  );
}

export default ProfileFormCustomer;
