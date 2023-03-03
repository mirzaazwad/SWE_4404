import {Navbar,Container,Image} from 'react-bootstrap';
import 'bootstrap';

const NavbarLanding = () => {
  return (
    <Navbar className='customNavbar fixed-top ' variant="dark" expand="lg">
      <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
        <Navbar.Brand className='px-2' href="/" style={{all:'unset',fontSize:28,paddingLeft:10,color:'white'}}>M e d G u a r d</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarLanding;
