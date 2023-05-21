import { Button, Card } from "react-bootstrap";

const DeliveryCard = ({order}) => {
  const handleOrder=()=>{
    
  }
  return ( 
    <div className="deliveryCard">
      <Card className='w-100 mb-3' style={{width:'100%'}}>
          <Card.Header style={{backgroundColor: "#EB006F", color: "white"}}>
            Order From: {order.pharmacy}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <div className='d-flex justify-content-between'>
                <div>
                  <p>Address: {order.address} </p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer className="float-right">
            <Button className="btn btn-primary" onClick={handleOrder}>Accept</Button>
            <Button  className="btn btn-danger" style={{marginLeft:'1%'}}>Decline</Button>
          </Card.Footer>
        </Card>
    </div>
   );
}
 
export default DeliveryCard;