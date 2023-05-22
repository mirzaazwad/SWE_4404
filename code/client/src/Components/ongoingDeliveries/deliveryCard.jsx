import axios from "axios";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

const DeliveryCard = ({ order,user,setRouteLocation }) => {
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const handleOrder = async (e) => {
    setError("");
    e.preventDefault();
    const result=await axios
      .patch("/api/delivery/updateorderstatus/"+user._id,{
        orderID:order.orderID
      },{
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? "google" : "email",
        },
      })
      .then((result) => result.data);
      if(result.success){
        // navigate('/deliveryHistory');
      }
  };

  return (
    <div className="deliveryCard">
      <div className="errorValue" style={{color:"red"}}>{error}</div>
      <Card className="w-100 mb-3" style={{ width: "100%" }}>
        <Card.Header style={{ backgroundColor: "#103686", color: "white" }}>
          Order To: {order.fullName}
        </Card.Header>
        <Card.Body>
          <Card.Text>
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
          <Button className="btn btn-primary" onClick={handleOrder}>
            Successful
          </Button>
          <Button className="btn btn-danger" style={{ marginLeft: "1%" }}>
            Failed
          </Button>
          <Button className="btn btn-danger" style={{ marginLeft: "1%" }} onClick={()=>{
            console.log(order.coordinates);
            setRouteLocation(order.coordinates)
          }}>
            Show Route
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DeliveryCard;
