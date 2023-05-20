import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { clearItems } from "../../Contexts/cartAction.js";
import { Card, Form, Button, Row, Col, Table } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import axios from 'axios';
import {CreditCard2Back, Wallet} from 'react-bootstrap-icons';
import { useToken } from '../../Hooks/useToken.js';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import MapModal from '../partials/Map/map.jsx';
import ErrorModal from '../partials/errorModal.jsx';

const CheckOutPage = ({}) => {
  const user=useToken();
  const navigate=useNavigate();
  const locator=useLocation();
  const queryParams = new URLSearchParams(locator.search);
  const paymentStatus = queryParams.get('paymentStatus');
  const {orderId} = useParams();
  const pharmacyId=queryParams.get('pid');
  const userId=user._id;
  const [customerEmail,setCustomerEmail]=useState("");
  const [customerPhoneNumber,setCustomerNumber]=useState("");
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [payment, setPayment] = useState(null);
  const dispatch = useDispatch();
  const [pharmacyManagerID,setPharmacyManagerID]=useState("");
  const [items,setItems]= useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [location,setLocation]=useState(null);
  const [showMAP,setShowMAP]=useState(false);
  const [stopDropDown,setStopDropDown]=useState(false);
  const [error,setError]=useState("");
  const [disabled,setDisabled]=useState(false);

  useEffect(()=>{
    setFullName(queryParams.get('cname'));
    setAddress(queryParams.get('address'));
    const onSuccess=async ()=>{
      await dispatch(clearItems());
      navigate('/myOrders');
    }
    if(paymentStatus==="success"){
      onSuccess();
    }
    else if(paymentStatus==="fail"){
      setError("Digital Payment Failed");
    }
    else if(paymentStatus==="cancel"){
      setError("Digital Payment was Cancelled");
    }
    else if(paymentStatus==="risky"){
      setError("Digital Payment was risky");
    }
  },[paymentStatus,orderId,pharmacyId])

  


  useEffect(() => {
    const retrieveUser=async ()=>{
      await axios.get('/api/profile/user/getUser/'+user._id,{
        headers:{'Authorization': `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email'}
      }).then((result)=>{
        setLocation(result.data.coordinates);
        setAddress(result.data.address);
        setFullName(result.data.username);
        setCustomerNumber(result.data.phone);
        setCustomerEmail(result.data.email);
      })
    }
    retrieveUser();
    const retreieveOrder = async ()=>{
      await axios.get(`/api/order/getOrderDetails/${userId}/${orderId}`,{
        headers:{'Authorization': `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email'}
      }).then((result)=>{
        const { order } = result.data;
      setItems(order.medicines);
      setPharmacyManagerID(order.customer_data.pharmacyManagerID);
      })
    }
    retreieveOrder();
    let price = 0;
    items.forEach(item => {
      price += item.price;
    });
    setTotalPrice(price);

  }, [customerEmail]);

  // useEffect(()=>{
  //   if(items.length===0){
  //     navigate('/myOrders');
  //   }
  // },[items])

  const handleCheckOut = async (e) => {
    setDisabled(true);
    const response =  axios.patch(`http://localhost:4000/api/order/billingOrder/${userId}/${orderId}`, {
      customer_data: {
        email:customerEmail,
        phone:customerPhoneNumber,
        pharmacyManagerID:pharmacyManagerID,
        fullName: fullName,
        address: address,
        coordinates:location,
        payment: payment,
        amount: totalPrice+50
      },
    },{
      headers:{'Authorization': `Bearer ${user.token}`,
      'idType':user.googleId?'google':'email'}
    }).then(async (result)=>{
    });
    navigate('/myOrders');
    
  };


      
  return (
    <div className="CheckOutPage">
       <MapModal currentLocation={location} address={address} setAddress={setAddress} startDropDown={setStopDropDown} dropdown={stopDropDown}  show={showMAP} setShow={setShowMAP} setLocation={setLocation}/>
       <ErrorModal error={error} setError={setError}/>
        <div className='navbarCustomer'>
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
              <Form.Group className="mb-3" as={Row} controlId="fullName">
                <Form.Label column sm={3}>
                  Email
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    disabled={true}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row} controlId="fullName">
                <Form.Label column sm={3}>
                  Mobile Number:
                </Form.Label>
                <Col sm={9}>
                  <Form.Control
                    type="text"
                    value={customerPhoneNumber}
                    onChange={(e) => setCustomerNumber(e.target.value)}
                    disabled={true}
                    required
                  />
                </Col>
              </Form.Group>
              <Form.Group className="mb-3" as={Row} controlId="address">
                <Form.Label column sm={3}>
                  Address
                </Form.Label>
                <Col sm={9}>
                <Form.Control type="address" placeholder="Address" value={address==="7M59GGJQ+MR"?"":address} onClick={()=>setShowMAP(!showMAP)} required/>
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
          <Button className="btn btn-placeOrder" type="submit" disabled={payment===null || disabled || address==="7M59GGJQ+MR"}>Place Order</Button>
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
            {items.map((medicine, index) => (
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