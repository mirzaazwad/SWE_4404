import axios from "axios";
import { useState } from "react";
import {Button, Card } from "react-bootstrap";

const DeliveryCard = ({ order,user}) => {
  const [error,setError]=useState("");

  const handleConfirm=async(e)=>{
    setError("");
    e.preventDefault();
    const result=await axios
      .patch("/api/delivery/updatecompletedstatus/"+user._id,{
        orderID:order.orderID
      },{
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? "google" : "email",
        },
      })
      .then((result) => result.data);
      if(result.success){
        window.location.reload();
      }
  }
  
  return (
    <div className="deliveryCard">
      <div className="errorValue" style={{color:"red"}}>{error}</div>
      <Card className="w-100 mb-3" style={{ width: "100%" }}>
        <Card.Header style={{ backgroundColor: "#EB006F", color: "white" }}>
          <div className="pharmacyHeader">
          Order From: {order.pharmacy}
          </div>
          <div className="customerHeader">
          Order To: {order.fullName}
          </div>
          <div className="customerHeader">
          Order ID: {order.orderID}
          </div>
        </Card.Header>
        <Card.Body>
          <Card.Text>
              <div>
                <p>Customer Name: {order.fullName} </p>
              </div>
              <div>
                <p>Customer Phone: {order.phone} </p>
              </div>
              <div>
                <p>Customer Email: {order.email} </p>
              </div>
              <div>
                <p>Customer Address: {order.address} </p>
              </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="float-right">
          <Button className="btn btn-primary" onClick={handleConfirm}>
            Confirm
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DeliveryCard;
