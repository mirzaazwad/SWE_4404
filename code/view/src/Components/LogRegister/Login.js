import { Container, Card, Form, Button } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Envelope, Lock } from "react-bootstrap-icons";
const Login = () => {
  return (
    <Container>
      <Card className="myCard myLeftCtn">
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>Login</Card.Title>
          <Card.Text>
            <Form className="myForm text-center">
              <Form.Group controlId="Email">
                <Form.Label>
                  <Envelope color="#eb006f" />
                </Form.Label>
                <Form.Control
                  type="email"
                  required
                  className="myInput"
                  placeholder="Email"
                />
              </Form.Group>
              <Form.Group controlId="Password">
                <Form.Label>
                  <Lock color="#eb006f" />
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  required
                  className="myInput"
                />
              </Form.Group>
              <Button type="submit" className="butt submitButton">
                Login
              </Button>
              <hr/>
              <Form.Group controlId="LoginWithGoogle">
                <Button className="butt">
                  <FaGoogle /> Login with Google
                </Button>
                <Button className="butt">
                  <FaFacebook /> Login with Facebook
                </Button>
              </Form.Group>
            </Form>
            <div className="noExistingAccount landingText">
              Don't have an account?
              <Link to="/1" style={{ color: "#eb006f" }}>
                REGISTER NOW!
              </Link>
            </div>
            <div className="forgotPassword landingText">
              <a href="" style={{ color: "#eb006f" }}>
                FORGOT PASSWORD?
              </a>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default Login;
