import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearItems } from "../../Contexts/cartAction.js";
import { Card, Form, Button, Row, Col, Table } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import axios from 'axios';
import {CreditCard2Back, Wallet} from 'react-bootstrap-icons';
import { useToken } from '../../Hooks/useToken.js';
const CheckOutPage = ({}) => {
  const user=useToken();
  const userId=user._id;
  const [customerEmail,setCustomerEmail]=useState("");
  const [customerPhoneNumber,setCustomerNumber]=useState("");
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [city, setCity] = useState();
  const [postalCode, setPostalCode] = useState();
  const [country, setCountry] = useState();
  const [payment, setPayment] = useState();
  const dispatch = useDispatch();
  const pharmacyManagerID=localStorage.getItem('cartPharmacyManager') || "";
  const cart = useSelector(state => state.cartState) || [];
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const retrieveUser=async ()=>{
      await axios.get('/api/profile/user/getUser/'+user._id,{
        headers:{'Authorization': `Bearer ${user.token}`}
      }).then((result)=>{
        setCustomerNumber(result.data.phone);
        setCustomerEmail(result.data.email);
      })
    }
    retrieveUser();
    let price = 0;
    cart.forEach(item => {
      price += item.price;
    });
    setTotalPrice(price);
  }, [customerEmail]);
  const handleCheckOut = async () => {
    
    const response =  axios.post(`http://localhost:4000/api/order/postOrder/${userId}`, {
      items: cart,
      customer_data: {
        email:customerEmail,
        phone:customerPhoneNumber,
        pharmacyManagerID:pharmacyManagerID,
        fullName: fullName,
        address: address,
        city: city,
        postalCode: postalCode,
        country: country,
        payment: payment
      },
    },{
      headers:{'Authorization': `Bearer ${user.token}`}
    })
    console.log(cart);
    await dispatch(clearItems());
    console.log(cart);
  };
  return (
    <div>

        <div>
        <NavbarCustomer />
      </div>
      <div className="heading-checkOut">
      <h2 style={{alignContent: "center", color: "#EB006F"}}>Checkout</h2>
      </div>
<div className="checkout-page d-flex justify-content-between">
      <div className="billing-details-card-container w-50 mx-4">

        <Card className="billing-details-card w-100">
        <Form onSubmit={handleCheckOut}>
          <Card.Header className="billing-details-card-header">
            Billing Details
          </Card.Header>
          <Card.Body>
            
              <Form.Group className="mb-3" as={Row} controlId="fullName">
                <Form.Label column sm={3}>
                  Full Name
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row} controlId="address">
                <Form.Label column sm={3}>
                  Address
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row} controlId="city">
                <Form.Label column sm={3}>
                  City
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row} controlId="postalCode">
                <Form.Label column sm={3}>
                  Postal Code
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={postalCode}
                    onChange={(e) => setPostalCode(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row} controlId="country">
                <Form.Label column sm={3}>
                  Country
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row}>
                <Form.Label as="legend" column sm={3}>
                  Payment Method
                </Form.Label>
                <Col sm={9}>
                  <Button className="btn-login me-5" size="sm" onClick={()=>setPayment("Cash On Delivery")} style={{backgroundColor:payment==="Cash On Delivery"?"#EB006F":"#3b6ce7",border:"none"}}><Wallet/> Cash on Delivery</Button>
                  <Button className="btn-login me-5" size="sm" onClick={()=>setPayment("Digital Payment")} style={{backgroundColor:payment==="Digital Payment"?"#EB006F":"#3b6ce7",border:"none"}}><CreditCard2Back/> Digital Payment</Button>
                </Col>
              </Form.Group>
          </Card.Body>
          <Card.Footer>
          <Button className="btn btn-placeOrder" type="submit">Place Order</Button>
          </Card.Footer>
          </Form>
        </Card>
      </div>

      <div className="order-summary-container w-50 mx-4">
        <Card className="order-summary-card">
          <Card.Header className="order-summary-card-header">
            Order Summary
          </Card.Header>
          <Card.Body>
          <Table striped bordered hover responsive>
          <thead>
            <tr style={{textAlign: "center"}}>
              <th>#</th>
              <th>Name</th>
              <th>Pcs</th>
              <th>Strips</th>
              <th>Boxes</th>
              <th>Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.map((medicine, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{medicine.MedicineName}</td>
                <td>{medicine.quantityPcs}</td>
                <td>{medicine.quantityStrips}</td>
                <td>{medicine.quantityBoxes}</td>
                <td>{medicine.price}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        <hr/>
        <div className='d-flex justify-content-between'>
            <div><h5 style={{color: "red"}}>Sub total: </h5></div>
            <div><h5 style={{color: "red"}}>৳{totalPrice}</h5></div>
        </div>
        <hr/>
        <div className='d-flex justify-content-between'>
            <div>
          <h5 style={{color: "red"}}>Delivery Charge: </h5>
            </div>
            <div>
            <h5 style={{color: "red"}}>৳50</h5>
            </div>
        </div>
        <hr/>
        <div className='d-flex justify-content-between'>
        <div><h5 style={{color: "red"}}>Total Price: </h5></div>
            <div><h5 style={{color: "red"}}>৳{totalPrice+50}</h5></div>
        </div>
          </Card.Body>
          
        </Card>
      </div>
    </div>
    </div>
    
  );
};
export default CheckOutPage;
