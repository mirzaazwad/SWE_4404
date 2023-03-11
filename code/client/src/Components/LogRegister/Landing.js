import LandingImage from "../partials/landing/image";
import Introduction from "../partials/landing/introduction";
import NavbarLanding from "../partials/landing/navbarLanding";
import { Provider} from "react-redux";
import { store } from "../../Contexts/store";
import LoginSignUp from "./LoginSignUp";
import 'bootstrap/dist/css/bootstrap.min.css';
import Login from "./Login";

const Landing = () => {
  return (
    <div className="Landing">
    <div><NavbarLanding /></div>
        
        <Provider store={store}>
          <section className="h-100">
            <div className="container fluid d-flex justify-content-around">
            <div className="landing-image-container my-auto">
      <LandingImage/>
    </div>
              <div className="login"><LoginSignUp/></div>
            </div>
          </section>
          </Provider>

    </div>
  );
};

export default Landing;
