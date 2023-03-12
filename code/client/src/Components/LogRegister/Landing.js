import LandingImage from "../partials/landing/image";
import NavbarLanding from "../partials/landing/navbarLanding";
import "bootstrap/dist/css/bootstrap.min.css";
import { useLocation, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { LOGIN } from "../../Contexts/action";
import Login from "./Login";
import SignUp from "./SignUp";

const Landing = (props) => {
  const location=useLocation();
  console.log(location);
  const dispatch = useDispatch();
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      dispatch(LOGIN(user));
    }
  }, [dispatch]);
  const card=props.data;
  return (
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
  );
};

export default Landing;
