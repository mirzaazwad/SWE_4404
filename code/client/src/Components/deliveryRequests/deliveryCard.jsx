import axios from "axios";
import { Button, Card } from "react-bootstrap";

const DeliveryCard = ({ order,user }) => {
  console.log(user,'in card');
  console.log(user.token);
  console.log(user.googleId);
  const handleOrder = async (e) => {
    e.preventDefault();
    await axios
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
      .then((result) => result.data.result).catch((error)=>console.log(error));
  };
  return (
    <div className="deliveryCard">
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
