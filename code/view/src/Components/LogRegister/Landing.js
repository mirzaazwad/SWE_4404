import { Container } from "react-bootstrap";
import LandingImage from "../partials/landing/image";
import Introduction from "../partials/landing/introduction";
import NavbarLanding from "../partials/landing/navbarLanding";
import { Provider} from "react-redux";
import { store } from "./loginRedux/store";
import LoginSignUp from "./LoginSignUp";
import 'bootstrap/dist/css/bootstrap.min.css';

const Landing = () => {
  return (
    <div className="Landing">
      <Provider store={store}>
        <NavbarLanding />
        <Container fluid>
          <LandingImage />
          <Introduction/>
          <LoginSignUp/>
        </Container>
      </Provider>
    </div>
  );
};

export default Landing;
