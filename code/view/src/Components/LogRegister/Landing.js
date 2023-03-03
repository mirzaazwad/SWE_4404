import { Container} from "react-bootstrap";
import LandingImage from "../partials/landing/image";
import Introduction from "../partials/landing/introduction";
import Login from "./Login";
import { useParams } from "react-router-dom";
import SignUp from "./SignUp";
import NavbarLanding from "../partials/landing/navbarLanding";
const Landing = () => {
  const {id}=useParams();
  return (
    <div className="Landing">
      <NavbarLanding/>
      <Container fluid>
      <LandingImage />
      {id==1 && <SignUp/>}
      {(id==0 || id==null) && <Login/>}
      </Container>
    </div>
  );
};

export default Landing;
