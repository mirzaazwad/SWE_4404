import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Navbar from 'react-bootstrap/Navbar';
import { useNavigate} from 'react-router-dom';
import { useLogout } from '../../../Hooks/useLogout';
import '../../../index.css';
import { BellFill } from 'react-bootstrap-icons';

const NavbarDelivery=({user})=>{
  const {logout} = useLogout();
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
            <Nav.Link href={`/profileDelivery`}>Profile</Nav.Link>
            <Nav.Link href={`/deliveries`}>Delivery Tracker</Nav.Link>
            <Button className='btn customButton' onClick={handleLogout}>Log Out</Button>
            
          </Nav>
          <div>
          <Button className='customCart bg-transparent me-3' onClick={()=>{}}><BellFill/>
          <Badge bg='danger' className='cart-badge position-absolute mx-0'>0</Badge>
         </Button>
          </div>
          <Form className="customLogOut d-none d-lg-flex justify-content-end">
          <Button className='btn customButton' onClick={handleLogout}>Log Out</Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}


export default NavbarDelivery;

