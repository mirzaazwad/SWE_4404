import { Container, Card, Form, Button, InputGroup } from "react-bootstrap";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import "react-phone-number-input/style.css";
import { useSelector } from "react-redux";
import { useGeolocated } from "react-geolocated";

const PhoneNumber = () => {
  const id = useSelector((state) => state.loginState.id);
  const { coords, isGeolocationAvailable, isGeolocationEnabled } =
    useGeolocated({
      positionOptions: {
        enableHighAccuracy: false,
      },
      userDecisionTimeout: 5000,
    });
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    const user = { phone: value };
    e.preventDefault();
    const response = await fetch("api/signup/phone/" + id, {
      method: "PATCH",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const json = await response.json();
    if (!response.ok) {
      setError(json.error);
    } else {
      if (
        json.userType === "Seller" &&
        isGeolocationAvailable &&
        isGeolocationEnabled
      ) {
        console.log(id,coords.latitude,coords.longitude);
        if (coords.latitude!=null && coords.longitude!=null) {
          const data = {
            user_id: id,
            latitude: coords.latitude,
            longitude: coords.longitude
          };
          const resp = await fetch("api/signup/location", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          });
          const json = await resp.json();
          if (!resp.ok) {
            setError(json.error);
          } else {
            setError('');
            console.log(
              "signed up successfully with location"
            );
          }
        }
      }
      console.log("signed up successfully" + json.id + ": " + json.email);
    }
  };

  const setPhoneNumber = (event) => {
    setValue(event);
  };

  return (
    <div className="PhoneNumber">
      <Container
        className="login-container"
        style={{ marginTop: "1%", width: "33%" }}
      >
        <Card className="d-flex float-end" style={{ maxWidth: "100%" }}>
          <Card.Body>
            <Card.Title style={{ textAlign: "center" }}>
              Register Phone Number
            </Card.Title>
            <Card.Text>
              <Form onSubmit={handleSubmit}>
                <Form.Group>
                  <div style={{ color: "red" }}>
                    Currently our service works for Bangladesh only
                  </div>
                </Form.Group>
                <Form.Group>
                  <div style={{ color: "red" }}>{error}</div>
                </Form.Group>
                <InputGroup className="mt-3 mb-3">
                  <Form.Group controlId="phoneNumber">
                    <PhoneInput
                      placeholder="Enter phone number"
                      defaultCountry="BD"
                      value={value}
                      style={{ paddingLeft: "75px", paddingRight: "75px" }}
                      onChange={setPhoneNumber}
                    />
                  </Form.Group>
                </InputGroup>

                <Button
                  type="submit"
                  variant="outline-primary"
                  size="sm"
                  style={{
                    marginLeft: "40%",
                  }}
                >
                  Verify
                </Button>
              </Form>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
};

export default PhoneNumber;
