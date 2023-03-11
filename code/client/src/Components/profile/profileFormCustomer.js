import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { InputGroup } from 'react-bootstrap';
import {EyeFill,EyeSlashFill} from "react-bootstrap-icons";
import "../../index.css";
import 'boxicons';
import { useDispatch, useSelector } from 'react-redux';
import { setBuyerUser,LOGOUT } from '../../Contexts/action';

const ProfileFormCustomer=(id)=>{
  const buyer=useSelector((state) => state.userState.buyerState);
  const user=useSelector((state) => state.userState.user);
  const dispatch=useDispatch();
  const [isDisabled, setIsDisabled] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isLocked,setisLocked]=useState(false);
  const [username,setUsername]=useState("");
  const [phone,setPhone]=useState("");
  const [address,setAddress]=useState("");
  const [currentPasswordVisibility, setCurrentPasswordVisibility] = useState(false);
  useEffect(()=>{
    setUsername(buyer.username);
    setPhone(buyer.phone);
    setAddress(buyer.address);
  },[buyer])
  
  const [password,setPassword]=useState(null);
  const turnOnEdit = () => {
    setIsDisabled(false);
    setIsEditing(true);
  }
  
  const turnOffEdit = () => {
    setIsDisabled(true);
    setIsEditing(false);
  }

  const handleSubmit = async (e) =>{
    e.preventDefault();
    turnOffEdit();
    setisLocked(true);
    await axios.patch('/api/profile/user/'+id.id,{
      username:username,
      phone:phone,
      address:address
    },{
      headers: {
        'Authorization': `Bearer ${user.token}`
      }
  }).then((result)=>{
      console.log(result);
      dispatch(setBuyerUser(result.data));
    })
    .catch((error)=>{
      if(error.response.status===401){
        localStorage.removeItem('user');
        dispatch(LOGOUT);
      }
    });
    setPassword(null);
    setIsEditing(false);
    setisLocked(false);
  }
  const verify = async() =>{
    const user={id:_id.id, password:CryptoJS.SHA512(password).toString()};
    const response = await fetch('http://localhost:4000/api/profile/changePassword/' + _id.id, {
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
      console.log(password);  
      console.log("current password is incorrect");
      return false;
    }
  }

  return (
    <div>
      <div className="profileInfo d-flex justify-content-between">
        <h4 className="InfoHeader mb-4">Personal Information</h4>
        <button className="btn btn-outline-dark btn-editProfile " onClick={turnOnEdit}>Edit Profile
        <i className='bx bx-cog bx-sm' ></i></button>
      </div>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Name</Form.Label>
          <Form.Control type="text" placeholder="Enter your name"  disabled={isDisabled} value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Contact No.</Form.Label>
          <Form.Control type="text" placeholder="Enter contact no." disabled={isDisabled} value={phone} onChange={(e)=>setPhone(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Address</Form.Label>
          <Form.Control type="address" placeholder="Address" disabled={isDisabled} value={address} onChange={(e)=>setAddress(e.target.value)}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"   disabled={isDisabled} value = {user.email} />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          {isEditing && (
            <a href={"changePassword/"+user._id}>Change Password</a>
          )}
        </Form.Group>
        
        {isEditing && (
          <Button className="btn btn-outline-dark btn-save" disabled={isLocked}  onClick={handleShow} >
            Save
          </Button>

        )}</Form>
                <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Enter Password to Confirm Changes</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Form>
                  <Form.Group className="mb-3" controlId="enterPassword">
            
            <Form.Label>Enter Password</Form.Label>
            <InputGroup>
            <Form.Control  type={currentPasswordVisibility?"text":"password"} placeholder="Password" value={password}  onChange={(e)=>setPassword(e.target.value)}/>                 
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
                  </Form>
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleClose}>
                    Close
                  </Button>
                  <Button variant="primary"  onClick={handleSubmit}>
                    Save Changes
                  </Button>
                </Modal.Footer>
              </Modal>
    </div>
  );
}
export default ProfileFormCustomer;
// onClick={(e)=>handleSubmit(e)}
