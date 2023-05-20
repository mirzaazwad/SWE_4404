import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useParams} from "react-router-dom";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import {Table} from 'react-bootstrap';
import { useToken } from "../../Hooks/useToken";
import Loader from "../partials/loader";
const OrderDetailsCard = () => {
  const user=useToken();
  const { userId, orderId } = useParams();
  const [order, setOrder] = useState({});
  const [loader,setLoader]=useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(
          `/api/order/getOrderDetails/${userId}/${orderId}`
        ,{
          headers:{'Authorization': `Bearer ${user.token}`,
          'idType':user.googleId?'google':'email'}
        });
        setOrder(response.data.order);
        if(response.data.order)
        {
          setLoader(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, []);
if(!loader){
  return(
    <Loader/>
  )
}
  if(order.prescription_image===""){
    return (
      <div>
        <div className="mb-5">
          <NavbarCustomer />
        </div>
        <div>
        <Card className="billing-details-card w-50 m-auto py-4">
            <Card.Header className="billing-details-card-header">
              Billing Details
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <b>Name: </b>
                {order.customer_data.fullName}
              </Card.Text>
              <Card.Text>
                <b>Phone Number: </b>
                {order.customer_data.phone}
              </Card.Text>
              <Card.Text>
                <b>Address: </b>
                {order.customer_data.address}
              </Card.Text>
                {order.customer_data.payment && (<Card.Text><b>Payment Method: </b>{order.customer_data.payment}</Card.Text>)}
            </Card.Body>
        </Card>
          <Card className='order-details-card'>
            <Card.Header className='order-details-card-header'>Order Details</Card.Header>
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
                  {order.medicines && order.medicines.map((medicine, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{medicine.MedicineName}</td>
                      <td>{medicine.quantityPcs}</td>
                      <td>{medicine.quantityStrips}</td>
                      <td>{medicine.quantityBoxes}</td>
                      <td>{medicine.price}</td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="5" style={{textAlign: "right"}}>Delivery Charges</td>
                    <td>50</td>
                  </tr>
                  <tr>
                    <td colSpan="5" style={{textAlign: "right"}}>Total</td>
                    <td>{order.customer_data.amount}</td>
                  </tr>
                  <Card>


                  </Card>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    );
  }
  else{
    return (
      <div>
        <div className="mb-5">
        <NavbarCustomer />
      </div>
        <div>
        <Card className="billing-details-card w-50 m-auto py-4">
            <Card.Header className="billing-details-card-header">
              Billing Details
            </Card.Header>
            <Card.Body>
              <Card.Text>
                <b>Name: </b>
                {order.customer_data.fullName}
              </Card.Text>
              <Card.Text>
                <b>Phone Number: </b>
                {order.customer_data.phone}
              </Card.Text>
              <Card.Text>
                <b>Address: </b>
                {order.customer_data.address}
              </Card.Text>
                {order.customer_data.payment && (<Card.Text><b>Payment Method: </b>{order.customer_data.payment}</Card.Text>)}
            </Card.Body>
        </Card>
    <Card className='view-prescription-card'>
      <Card.Header style={{backgroundColor: "#EB006F", textAlign: "center", color: "white", fontSize:"1.5rem"}}>
       Prescription
      </Card.Header>
      <Card.Body>
      <Card.Img variant="top" src={order.prescription_image}/>
      </Card.Body>
    </Card>
        </div>
    </div>
    );
  }
  
};

export default OrderDetailsCard;