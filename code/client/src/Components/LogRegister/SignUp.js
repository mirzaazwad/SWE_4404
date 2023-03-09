import {Container,Card,Form,Button,InputGroup,ToggleButton,ButtonGroup,} from "react-bootstrap";
import { FaFacebook, FaGoogle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { setLogin} from "../../Contexts/loginRedux/action";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import {emailAuth,passwordAuth,confirmPasswordAuth,userNameAuth} from "../../Contexts/Auth/Auth";
import CryptoJS from "crypto-js";
import {Envelope,Lock,EyeFill,EyeSlashFill,Person} from "react-bootstrap-icons";

const SignUp = () => {
  const dispatch = useDispatch();
  const [radioValue, setRadioValue] = useState(1);
  const [radioName, setRadioName] = useState("Buyer");
  const radios = [{ name: "Buyer", value: 1 },{ name: "Seller", value: 2 },];
  const [isLocked, setisLocked] = useState(true);
  const [isGlobalLocked,setisGlobalLocked] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState(false);
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorCPassword] = useState("");
  const [confirmPasswordVisibility, setConfirmPasswordVisibility] = useState(false);
  useEffect(() => {
    if (password !== "" && confirmPassword !== "" && username !== "" && email !== "" && errorEmail === "" && errorPassword === "" && errorConfirmPassword === "") {
      setisLocked(false);
    } else {
      setisLocked(true);
    }
  }, [
    password,username,email,confirmPassword,errorEmail,errorPassword,errorConfirmPassword]);
    useEffect(() => {
      const fetchUsers = async () => {
        const seller_response = await fetch("api/seller/signup/email/" + email);
        if (seller_response.ok) {
          setErrorEmail("account already exists with email");
        }
        const buyer_response = await fetch("api/buyer/signup/email/" + email);
        if (buyer_response.ok) {
          setErrorEmail("account already exists with email");
        }
      };
      if (!errorEmail && email!=="")fetchUsers();
    }, [email, errorEmail]);

    const emailChange = (event) => {
      const result=emailAuth(event.target.value);
      setEmail(result.email);
      if(result.error)setErrorEmail("Not valid email");
      else setErrorEmail("");
    };

  const passwordChange = (event) => {
    const passwordValidation=passwordAuth(event.target.value);
    const confirmPasswordValidation=confirmPasswordAuth(confirmPassword);
    setErrorPassword(passwordValidation.error);
    setPassword(passwordValidation.password);
    setErrorCPassword(confirmPasswordValidation.error);
  };

  const radioChange = (event) => {
    setRadioValue(event.target.value);
    if (event.target.value === 1) {
      setRadioName("Buyer");
    } else {
      setRadioName("Seller");
    }
  };
  const confirmPasswordChange = (event) => {
    const confirmPasswordValidation=confirmPasswordAuth(password, event.target.value);
    setErrorCPassword(confirmPasswordValidation.error);
    setConfirmPassword(confirmPasswordValidation.confirmPassword);
  };

  const handleSubmit =  async(e) => {
    setisLocked(true);
    setisGlobalLocked(true);
    e.preventDefault();
    const user = {username: username, email: email, password: CryptoJS.SHA512(password).toString()
    };
    const url = radioName === "Seller" ? "api/seller/signup" : "api/buyer/signup";
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      return setError(json.error);
    } else {
      window.location.href="/profile";
    }
  };
  
  const handleGoogle = async(e) =>{
      e.preventDefault();
      setisGlobalLocked(true)
      await fetch("api/signup/google",{
        method:"GET",
        state:(radioName==='Seller'?'seller':'buyer')
      })
  .then((result)=>{
    console.log(result);
    window.location.href=result.url;
  })
  }

  return (
    <Container style={{ marginTop: "12%", width: "33%" }}>
      <Card className="mt-5 float-end" style={{ maxWidth: "100%" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>SignUp</Card.Title>
          <Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="errorMessageEmail">
                <p style={{ color: "red" }}>{error}</p>
              </Form.Group>
              <Form.Group
                controlId="UserType"
                style={{
                  marginLeft: "33%",
                }}
              >
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
                      onChange={radioChange}
                    >
                      {radio.name}
                    </ToggleButton>
                  ))}
                </ButtonGroup>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Person color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="Username">
                  <Form.Control
                    type="text"
                    required
                    placeholder="Username"
                    className="float-end"
                    style={{ paddingLeft: "75px", paddingRight: "75px" }}
                    value={username}
                    onChange={(e)=>setUsername(userNameAuth(e.target.value))}
                  />
                </Form.Group>
              </InputGroup>
              <Form.Group controlId="errorMessageEmail">
                <p style={{ color: "red" }}>{errorEmail}</p>
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
                    style={{ paddingLeft: "75px", paddingRight: "75px" }}
                    value={email}
                    onChange={emailChange}
                  />
                </Form.Group>
              </InputGroup>
              <Form.Group
                controlId="errorPassword"
                style={{ overflowWrap: "anywhere" }}
              >
                <p style={{ color: "red" }}>{errorPassword}</p>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="Password">
                  <Form.Control
                    type={passwordVisibility?"text":"password"}
                    placeholder="Password"
                    required
                    className="float-end"
                    onChange={passwordChange}
                    value={password}
                    style={{ paddingLeft: "65px", paddingRight: "65px" }}
                  />
                </Form.Group>
                <InputGroup.Text>
                  {(passwordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setPasswordVisibility(false)} />
                  )) ||
                    (!passwordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
              <Form.Group controlId="errorConfirmPassword">
                <p style={{ color: "red" }}>{errorConfirmPassword}</p>
              </Form.Group>
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                <Form.Group controlId="ConfirmPassword">
                  <Form.Control
                    type={confirmPasswordVisibility?"text":"password"}
                    placeholder="Confirm Password"
                    required
                    className="float-end"
                    value={confirmPassword}
                    onChange={confirmPasswordChange}
                    style={{ paddingLeft: "65px", paddingRight: "65px" }}
                  />
                </Form.Group>
                <InputGroup.Text>
                  {(confirmPasswordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setConfirmPasswordVisibility(false)} />
                  )) ||
                    (!confirmPasswordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setConfirmPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
              <Button
                type="submit"
                variant="outline-primary"
                size="sm"
                style={{
                  marginLeft: "40%",
                }}
                disabled={isLocked || isGlobalLocked}
              >
                SignUp
              </Button>
              <hr />
              <Form.Group controlId="LoginWithGoogle">
                <Button
                  variant="outline-primary"
                  size="lg"
                  style={{ marginLeft: "30%" }}
                >
                  <FaGoogle onClick={(e)=>handleGoogle(e)} disabled={isGlobalLocked}/>
                </Button>
                <Button variant="outline-primary" size="lg" className="mx-5">
                  <FaFacebook disabled={isGlobalLocked}/>
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
