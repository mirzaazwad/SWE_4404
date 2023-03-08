import { Container,Row,Col } from "react-bootstrap";
import LandingImage from "../partials/landing/image";
import Introduction from "../partials/landing/introduction";
import NavbarLanding from "../partials/landing/navbarLanding";
import { Provider} from "react-redux";
import { store } from "./loginRedux/store";
import LoginSignUp from "./LoginSignUp";
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
  return (
    <Provider store={store}>
    <div>
    <NavbarLanding />
    <section>
    <div className="container h-100">
      <div className="pt-5">
    <div className="mt-5 d-lg-none d-flex justify-content-between"><LandingImage/></div></div>
      <div className="d-flex justify-content-around h-100 mx-auto my-5 w-75" style={{alignItems : 'left'}}>
      <div className="my-3 d-none d-lg-flex"><LandingImage/></div>
        <div className="profile-form-outer w-50 mt-5">
          <LoginSignUp />
        </div>
      </div>
    </div>
    
    </section>
          
    </div>
   </Provider>
    // <div className="Landing">
    //     <NavbarLanding />
    //   <Container>
    //   <div className="mt-5 d-lg-none d-flex justify-content-center"><LandingImage/></div>
    //   </Container>
    // </div> 
  );
};

export default Landing;
