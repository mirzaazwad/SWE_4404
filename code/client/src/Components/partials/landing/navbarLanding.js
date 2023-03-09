import {Navbar,Container} from 'react-bootstrap';

const NavbarLanding = () => {
  return (
    <Navbar className='customNavbar fixed-top' variant="dark" expand="lg" style={{display:'block',position:'absolute',zIndex:-5}}>
      <Container fluid className='navbarContents px-0 px-lg-5 d-flex justify-content-between' >
        <Navbar.Brand className='px-2' href="/" style={{fontSize:28,color:"white"}}>M e d G u a r d</Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default NavbarLanding;
