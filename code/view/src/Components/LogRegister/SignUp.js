import {
  Container,
  Card,
  Form,
  Button,
  ToggleButtonGroup,
  ToggleButton,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useState } from "react";

import { Envelope, Lock, Calendar2 } from "react-bootstrap-icons";
const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCFPassword] = useState("");
  const [error, setError] = useState("");
  const [dob, setDOB] = useState();
  const handleSubmit = () => {
    if (password !== confirmPassword) {
      console.log("error occurs due to password");
      setError("Passwords do not match");
    } else {
      fetch("localhost:3000", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email,
          password: password,
          dob: dob,
        }),
      });
    }
  };

  return (
    <Container>
      <Card className="myCard myLeftCtn">
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>SignUp</Card.Title>
          <Card.Text>
            <Form className="myForm text-center">
              <Form.Group controlId="error messages">
                <p>{error}</p>
              </Form.Group>
              <Form.Group controlId="UserType"></Form.Group>
              <Form.Group controlId="Email">
                <Form.Label>
                  <Envelope color="#eb006f" />
                </Form.Label>
                <Form.Control
                  type="email"
                  required
                  className="myInput"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="ConfirmPassword">
                <Form.Label>
                  <Lock color="#eb006f" />
                </Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Confirm Password"
                  required
                  className="myInput"
                  value={confirmPassword}
                  onChange={(e) => setCFPassword(e.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="DOB">
                <Form.Label>
                  <Calendar2 color="#eb006f" />
                </Form.Label>
                <Form.Control
                  type="date"
                  required
                  className="myInput"
                  value={dob}
                  onChange={(e) => setDOB(e.target.value)}
                />
              </Form.Group>
                <Button type="submit" onSubmit={handleSubmit} className="butt submitButton">
                  SignUp
                </Button>
              <hr />
              <Form.Group controlId="LoginWithGoogle">
                <Button className="butt">
                  <FaGoogle /> Sign Up with Google
                </Button>
                <Button className="butt">
                  <FaFacebook /> Sign Up with Facebook
                </Button>
              </Form.Group>
            </Form>
            <div className="existingAccount landingText">
              Already have an account?
              <Link to="/0" style={{ color: "#eb006f" }}>
                LOG IN!
              </Link>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default SignUp;
