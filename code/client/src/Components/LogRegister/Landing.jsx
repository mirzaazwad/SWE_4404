import LandingImage from "../partials/landing/image";
import NavbarLanding from "../partials/landing/navbarLanding";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./Login";
import SignUp from "./SignUp";
import { GoogleOAuthProvider } from '@react-oauth/google';
const Landing = (props) => {
  const card = props.data;
  return (
    <GoogleOAuthProvider clientId={process.env.REACT_APP_GCI}>.
    <div className="Landing">
      <div>
        <NavbarLanding />
      </div>
      <section className="h-100">
        <div className="container fluid d-flex justify-content-around">
          <div className="landing-image-container my-auto">
            <LandingImage />
          </div>
          <div className="login">
            {(card === "login" && <Login />) ||
              (card === "signup" && <SignUp />)}
          </div>
        </div>
      </section>
    </div>
    </GoogleOAuthProvider>
  );
};

export default Landing;
