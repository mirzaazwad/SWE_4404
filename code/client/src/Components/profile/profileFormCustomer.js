import axios from 'axios';
import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import "../../index.css";
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

  return (
    <div>
      <div className="profileInfo d-flex justify-content-between">
        <h4 className="InfoHeader mb-4">Personal Information</h4>
        <button className="btn btn-outline-dark btn-editProfile " onClick={turnOnEdit}>Edit Profile
        <i class='bx bx-cog bx-sm' ></i></button>
      </div>
      <Form onSubmit={handleSubmit}>
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
          <Form.Label>Email Address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"  disabled={true} value={buyer.email}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Enter Password for Reset" disabled={isDisabled} value={password} onChange={(e)=>setPassword(e.target.value)}/>
        </Form.Group>
      
        {isEditing && (
          <Button className="btn btn-outline-dark btn-save" type="submit" disabled={isLocked}>
            Save
          </Button>
        )}</Form>
    </div>
  );
}

export default ProfileFormCustomer;
