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
    <section className="container">
      <div className="landing-signup-container d-flex justify-content-between">
        <div className="landing-image-container">
          <div className="mt-5 d-lg-none d-flex justify-content-between">
            <LandingImage />
          </div>
          <div className="d-none d-lg-flex">
            <LandingImage />
          </div>
        </div>
        <div className="signup-container d-flex justify-content-center">
          <div className="profile-form-outer mt-5" style={{ width: '80%' }}>
            <LoginSignUp />
          </div>
        </div>
      </div>
    </section>
  </div>
</Provider>


  );
};

export default Landing;
