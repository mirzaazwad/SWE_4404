import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate} from 'react-router-dom';
import { useState } from 'react';
import { useLogout } from '../../../Hooks/useLogout';
import { useSelector } from 'react-redux';
import '../../../index.css';
import Modal from '../Modal';
import Cart from '../../cartManagementSystem/cart';

const NavbarCustomer=({user})=>{
  const {logout} = useLogout();
  const[cartView, setCartView] = useState(false);
  const cart = useSelector(state => state.cartState);
  const navigate=useNavigate();


  const handleLogout = () =>{
    logout();
    return navigate('/');
  }
  return (
    <Navbar className='customNavbar fixed-top ' variant="dark" expand="lg">
      <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
        <Navbar.Brand className='px-2'  href={`/profileBuyer`} style={{fontsize: '400px'}}>M e d G u a r d</Navbar.Brand>
        <Navbar.Toggle className='px-2' aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 px-2"
            style={{ maxHeight: '150px' }}
            navbarScroll
          >
            <Nav.Link href={`/profileBuyer`}>Profile</Nav.Link>
            <Nav.Link href={`/ViewPharmacies`}>Pharmacies</Nav.Link>
            <Nav.Link href={`/prescription`}>Prescriptions</Nav.Link>
            <Nav.Link href={`/myOrders`}>My Orders</Nav.Link>
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

