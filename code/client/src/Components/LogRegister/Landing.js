import LandingImage from "../partials/landing/image";
import NavbarLanding from "../partials/landing/navbarLanding";
import LoginSignUp from "./LoginSignUp";
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
  return (
    <div className="Landing">
    <div><NavbarLanding /></div>
          <section className="h-100">
            <div className="container fluid d-flex justify-content-around">
            <div className="landing-image-container my-auto">
      <LandingImage/>
    </div>
              <div className="login"><LoginSignUp/></div>
            </div>
          </section>
    </div>
  );
};

export default Landing;
