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
    <div className="Landing">
        <NavbarLanding />
      <Container>
      <Provider store={store}>
        <Row>
          <Col md={8}>
            <Row>
              <Col xs={12} sm={6} md={12} lg={9}>
                <div className="container-1" style={{ height: '100%',width:'100%'}}><LandingImage /></div>
              </Col>
              <Col xs={12} sm={6} md={12} lg={6}>
                <div className="container-2" style={{ height: '100px'}}><Introduction/></div>
              </Col>
            </Row>
          </Col>
          <Col xs={12} md={4}>
            <div className="container-3"><LoginSignUp/></div>
          </Col>
        </Row>
        </Provider>
      </Container>
    </div>
  );
};

export default Landing;
