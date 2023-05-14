import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { useLogout } from '../../../Hooks/useLogout';
import { useNavigate} from 'react-router-dom';
import '../../../index.css';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { setNotification } from '../../../Contexts/action';
import axios from 'axios';

const NavbarPharmacy=(props) =>{
  const id = props.id;
  const dispatch=useDispatch();
  const chatMessages=useSelector((state)=>state.userState.notificationCount)
  const {logout}= useLogout();
  const navigate=useNavigate();
  let orderMessages=2;

  useEffect(()=>{
    const retrieveMessageCount =async()=>{
      const messages = await axios.post(
        "/api/profile/chat/countAllMessages/",
        { 
          receiverID: id
        },
        {
          headers: {
            Authorization: `Bearer ${props.user.token}`,
            'idType':props.user.googleId?'google':'email',
          },
        }
      );
      dispatch(setNotification(messages.data.count));
    }
    retrieveMessageCount();
  },[props.id])

  const handleLogout = () =>{
    logout();
    return navigate('/');
  }
  return (
    <Navbar className='customNavbar fixed-top ' variant="dark" expand="lg">
      <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
        <Navbar.Brand className='px-2' href="#"  style={{fontsize: '400px'}}>M e d G u a r d</Navbar.Brand>
        <Navbar.Toggle className='px-2' aria-controls="navbarScroll" />
        
        
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href={`/profileSeller/${id}`}>Profile</Nav.Link>
            <Nav.Link href={`/inventoryManagementSystem/inventory/${id}`}>Inventory</Nav.Link>
            <Nav.Link href="#action2">Orders
            {orderMessages>0?<span style={{verticalAlign:"super",display:"inline-block",lineHeight:"12px",textAlign:"center",fontSize:"12px",width:"12px",height:"12px",color:"#FFFFFF",backgroundColor:"red",borderRadius:"50%"}}> 
            {orderMessages}
            </span>:""}
            </Nav.Link>
            <Nav.Link href="">Accounts</Nav.Link>
            <Nav.Link href={`/profileSeller/chats/${id}`}>Chats
            {chatMessages>0?<span style={{verticalAlign:"super",display:"inline-block",lineHeight:"12px",textAlign:"center",fontSize:"12px",width:"12px",height:"12px",color:"#FFFFFF",backgroundColor:"red",borderRadius:"50%"}}> 
            {chatMessages}
            </span>:""}
            </Nav.Link>
            <Nav.Link className="d-block d-lg-none" onClick={handleLogout}>Log Out</Nav.Link>
          </Nav>
          <Form className="customLogOut d-none d-lg-flex justify-content-end">
            <Button className='customButton' onClick={handleLogout}>Log Out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarPharmacy;