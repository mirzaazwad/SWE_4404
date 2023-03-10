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
    <div className="signup-container" style={{ marginTop: "10%" }}>
      <Card className="w-75" style={{ maxWidth: "100%" }}>
        <Card.Body>
          <Card.Title style={{ textAlign: "center" }}>SignUp</Card.Title>
          <Card.Text>
            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="errorMessageEmail">
                <p style={{ color: "red" }}>{error}</p>
              </Form.Group>
              <Form.Group
                controlId="UserType"
              >
                <div className="d-flex justify-content-center w-100" >
                <ButtonGroup className="singUp-button ">
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
                </div>
                
              </Form.Group>

                <Form.Group controlId="Username" className="w-100">
                <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Person color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type="text"
                    required
                    placeholder="Username"
                    className="float-end"
                    value={username}
                    onChange={(e)=>setUsername(userNameAuth(e.target.value))}
                  />
              </InputGroup>
                </Form.Group>
              <Form.Group controlId="errorMessageEmail">
                <p style={{ color: "red" }}>{errorEmail}</p>
              </Form.Group>

                <Form.Group controlId="Email" className="w-100">
                <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Envelope color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type="email"
                    required
                    placeholder="Email"
                    className="float-end"
                    value={email}
                    onChange={emailChange}
                  />
              </InputGroup>
                </Form.Group>
              <Form.Group
                controlId="errorPassword"
                style={{ overflowWrap: "anywhere" }}
              >
                <p style={{ color: "red" }}>{errorPassword}</p>
              </Form.Group>

                <Form.Group controlId="Password" className="w-100">
                <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type={passwordVisibility?"text":"password"}
                    placeholder="Password"
                    required
                    className="float-end"
                    onChange={passwordChange}
                    value={password}
                  />
                <InputGroup.Text>
                  {(passwordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setPasswordVisibility(false)} />
                  )) ||
                    (!passwordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
                </Form.Group>
              <Form.Group controlId="errorConfirmPassword" className="w-100">
                <p style={{ color: "red" }}>{errorConfirmPassword}</p>
              </Form.Group>
                <Form.Group controlId="ConfirmPassword">
              <InputGroup className="mt-3 mb-3" size="sm">
                <InputGroup.Text>
                  <Lock color="#3354a9" />
                </InputGroup.Text>
                  <Form.Control
                    type={confirmPasswordVisibility?"text":"password"}
                    placeholder="Confirm Password"
                    required
                    className="float-end"
                    value={confirmPassword}
                    onChange={confirmPasswordChange}
                  />
                <InputGroup.Text>
                  {(confirmPasswordVisibility && (
                    <EyeFill color="#3354a9" onClick={()=>setConfirmPasswordVisibility(false)} />
                  )) ||
                    (!confirmPasswordVisibility && (
                      <EyeSlashFill color="#3354a9" onClick={()=>setConfirmPasswordVisibility(true)} />
                    ))}
                </InputGroup.Text>
              </InputGroup>
                </Form.Group>
                <div className="d-flex justify-content-center">
              <Button className="btn btn-login align-content-center"
                type="submit"
                size="md"
                disabled={isLocked || isGlobalLocked}
              >
                SignUp
              </Button>
              </div>
              <hr />
              <Form.Group controlId="LoginWithGoogle" className="d-flex justify-content-around">
                <Button className="btn btn-login me-2"
                  size="lg"
                >
                  <FaGoogle onClick={(e)=>handleGoogle(e)} disabled={isGlobalLocked}/>
                </Button>
                <Button className="btn btn-login" size="lg">
                  <FaFacebook disabled={isGlobalLocked}/>
                </Button>
              </Form.Group>
            </Form>
            <div className="existingAccount landingText" style={{ textAlign: "center"  }}>
              Already have an account?
              <Link
                to="/"
                style={{ color: "#3354a9", textAlign: "center"  }}
                onClick={() => dispatch(setLogin())}
              >
                LOG IN!
              </Link>
            </div>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SignUp;
