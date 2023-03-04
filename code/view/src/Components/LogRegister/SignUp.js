import { Container, Card, Form, Button, InputGroup,ToggleButton,ButtonGroup } from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useState } from "react";
import { setLogin } from "./loginRedux/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import DOMPurify from 'dompurify';

import {
  Envelope,
  Lock,
  Calendar2,
  EyeFill,
  EyeSlashFill,
} from "react-bootstrap-icons";

const SignUp = () => {
  const [checked, setChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  const radios = [
    { name: 'Buyer', value: '1' },
    { name: 'Seller', value: '2' },
  ];
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setCFPassword] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState("password");
  const [password_eyeSlash, eyeSlash] = useState(false);
  const changePassword = () => {
    if (passwordVisibility === "password") {
      setPasswordVisibility("text");
    } else {
      setPasswordVisibility("password");
    }
    eyeSlash(password_eyeSlash ^ true);
  };
  const emailChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setEmail(sanitizedValue);
  };
  const passwordChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setPassword(sanitizedValue);
  };
  const confirmPasswordChange = (event) => {
    const sanitizedValue = DOMPurify.sanitize(event.target.value);
    setCFPassword(sanitizedValue);
  };
  const [confirmPassword_eyeSlash, cpeyeSlash] = useState(false);
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] =
    useState("password");
  const changeCPassword = () => {
    if (confirmPasswordVisibility === "password") {
      setConfirmPasswordVisibility("text");
    } else {
      setConfirmPasswordVisibility("password");
    }
    cpeyeSlash(confirmPassword_eyeSlash ^ true);
  };
  const [error, setError] = useState("");
  const [dob, setDOB] = useState();

  return (
    <Container>
      <Card className="mt-5 float-end mobView logSignCard">
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>SignUp</Card.Title>
          <Card.Text>
            <Form>
              <Form.Group controlId="error messages">
                <p>{error}</p>
              </Form.Group>
              <Form.Group controlId="UserType" style={{
                        marginLeft:'33%'
                      }}>
                <ButtonGroup>
                  {radios.map((radio, idx) => (
                    <ToggleButton
                      key={idx}
                      id={`radio-${idx}`}
                      type="radio"
                      variant={idx % 2 ? "primary" : "primary"}
                      name="radio"
                      value={radio.value}
                      checked={radioValue === radio.value}
                      onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Envelope color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="Email">
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email"
                    className="float-end"
                    style={{paddingLeft:'75px',paddingRight:'75px'}}
                    value={email}
                    onChange={(e) => emailChange(e)}
                  />
                </Form.Group>
              </InputGroup>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="Password">
                  <Form.Control
                    type={passwordVisibility}
                    placeholder="Password"
                    required
                    className="float-end"
                    value={password}
                    onChange={(e) => passwordChange(e)}
                    style={{paddingLeft:'65px',paddingRight:'65px'}}
                  />
                </Form.Group>
                <InputGroup.Text>
                  {(password_eyeSlash && (
                    <EyeFill color="#3354a9" onClick={changePassword} />
                  )) ||
                    (!password_eyeSlash && (
                      <EyeSlashFill color="#3354a9" onClick={changePassword} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="ConfirmPassword">
                  <Form.Control
                    type={confirmPasswordVisibility}
                    placeholder="Confirm Password"
                    required
                    className="float-end"
                    value={confirmPassword}
                    onChange={(e) => confirmPasswordChange(e)}
                    style={{paddingLeft:'65px',paddingRight:'65px'}}
                  />
                </Form.Group>
                <InputGroup.Text>
                  {(confirmPassword_eyeSlash && (
                    <EyeFill color="#3354a9" onClick={changeCPassword} />
                  )) ||
                    (!confirmPassword_eyeSlash && (
                      <EyeSlashFill color="#3354a9" onClick={changeCPassword} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Calendar2 color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="DOB">
                  <Form.Control
                    type="date"
                    required
                    className="float-end"
                    style={{paddingLeft:'100px',paddingRight:'100px'}}
                    value={dob}
                    onChange={(e) => setDOB(e.target.value)}
                  />
                </Form.Group>
              </InputGroup>
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                style={{
                  marginLeft:'40%'
                }}
              >
                SignUp
              </Button>
              <hr />
              <Form.Group controlId="LoginWithGoogle">
                <Button variant="outline-primary" size="lg" style={{marginLeft:'30%'}}>
                  <FaGoogle />
                </Button>
                <Button variant="outline-primary" size="lg" className="mx-5">
                  <FaFacebook />
                </Button>
              </Form.Group>
            </Form>
            <div className="existingAccount landingText">
              Already have an account?
              <Link
                to="/"
                style={{ color: "#3354a9" }}
                onClick={() => dispatch(setLogin())}
              >
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
