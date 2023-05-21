import axios from "axios";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useNavigate } from "react-router";

const DeliveryCard = ({ order,user,setOrders,orders,index }) => {
  const [error,setError]=useState("");
  const navigate=useNavigate();
  const handleOrder = async (e) => {
    setError("");
    e.preventDefault();
    const result=await axios
      .patch("/api/delivery/addOrder/"+user._id,{
        customer_info:order.Orders[0].customer_data,
        pharmacyName:order.pharmacy,
        orderID:order.Orders[0]._id
      }, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? "google" : "email",
        },
      })
      .then((result) => result.data).catch(()=>setError('Order could not be confirmed, maybe assigned to another delivery man'));
      if(result.success){
        navigate('/ongoingDeliveries');
      }
  };

  // const handleShuffle=()=>{
  //   console.log(orders);
  //   let temp=orders[index];
  //   console.log('index removed: ',index);
  //   console.log(orders);
  //   const arr=orders.splice(index,1);
  //   console.log(arr);
  //   arr.push(temp);
  //   console.log(arr);
  //   setOrders(arr);
  // }
  
  return (
    <div className="deliveryCard">
      <div className="errorValue" style={{color:"red"}}>{error}</div>
      <Card className="w-100 mb-3" style={{ width: "100%" }}>
        <Card.Header style={{ backgroundColor: "#EB006F", color: "white" }}>
          Order From: {order.pharmacy}
        </Card.Header>
        <Card.Body>
          <Card.Text>
            <div className="d-flex justify-content-between">
              <div>
                <p>Address: {order.address} </p>
              </div>
            </div>
          </Card.Text>
        </Card.Body>
        <Card.Footer className="float-right">
          <Button className="btn btn-primary" onClick={handleOrder}>
            Accept
          </Button>
          <Button className="btn btn-danger" style={{ marginLeft: "1%" }}>
            Decline
          </Button>
        </Card.Footer>
      </Card>
    </div>
  );
};

export default DeliveryCard;
