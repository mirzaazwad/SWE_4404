import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate} from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useLogout } from '../../../Hooks/useLogout';
import { useSelector } from 'react-redux';
import { useToken } from '../../../Hooks/useToken';
import '../../../index.css';
import Modal from '../Modal';
import Cart from '../../cartManagementSystem/cart';
import axios from 'axios';

const NavbarCustomer=(props)=>{
  const id = localStorage.getItem('user')?JSON.parse(localStorage.getItem('user'))._id:props.id;
  const userToken=useToken();
  const {logout} = useLogout();
  const[cartView, setCartView] = useState(false);
  const cart = useSelector(state => state.cartState);
  const navigate=useNavigate();
  const [user,setUser]=useState({phone:null,address:null,username:null});

  useEffect(()=>{
    const retrieveUser =async()=>{
      const result=await axios.get('/api/profile/user/getUser/'+id,{headers: {
        'Authorization': `Bearer ${userToken.token}`,
        'idType':userToken.googleId?'google':'email'
      }}).then((result)=>{
        console.log(result);
        return result.data;
      }).catch((error)=>{
        console.log(error);
        return {phone:null,address:null,username:null};
      });
      setUser(result);
    }
    retrieveUser();
  },[id,props])

  const handleLogout = () =>{
    logout();
    return navigate('/');
  }
  return (
    <Navbar className='customNavbar fixed-top ' variant="dark" expand="lg">
      <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
        <Navbar.Brand className='px-2'  href={`/profileBuyer/${id}`} style={{fontsize: '400px'}}>M e d G u a r d</Navbar.Brand>
        <Navbar.Toggle className='px-2' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link href={`/profileBuyer/${id}`}>Profile</Nav.Link>
            <Nav.Link href={`/ViewPharmacies/${id}`}  disabled={!user.phone || !user.address || !user.username || user.phone==="" || user.address==="" || user.username===""}>Pharmacies</Nav.Link>
            <Nav.Link href={`/prescription`}  disabled={!user.phone || !user.address || !user.username  || user.phone==="" || user.address==="" || user.username===""}>Prescriptions</Nav.Link>
            <Nav.Link href={`/myOrders`}  disabled={!user.phone || !user.address || !user.username || user.phone==="" || user.address==="" || user.username===""}>My Orders</Nav.Link>
            <Nav.Link className="d-block d-lg-none" onClick={handleLogout}>Log Out</Nav.Link>
            
          </Nav>
          <div>
          <Button className='customCart bg-transparent me-3' onClick={()=>{setCartView(true)}}><i className='bx bxs-cart-add bx-md' style={{color: 'white', fontSize: '20px'}}>
          </i>
          <Badge bg='danger' className='cart-badge position-absolute mx-0'>{cart.length}</Badge>
         </Button>
          </div>
          {cartView? <Modal onClose={()=>{setCartView(false)}}><Cart></Cart></Modal>:null}
          <Form className="customLogOut d-none d-lg-flex justify-content-end">
            <Button className='btn customButton' onClick={handleLogout}>Log Out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavbarCustomer;

