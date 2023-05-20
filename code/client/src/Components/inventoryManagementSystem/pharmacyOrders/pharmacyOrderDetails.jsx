import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useParams} from "react-router-dom";
import NavbarPharmacy from "../../partials/profile/navbarPharmacy";
import {Table} from 'react-bootstrap';
import { useToken } from "../../../Hooks/useToken";

const OrderDetailsCard = () => {
  const user=useToken();
  const { userId, orderId } = useParams();
  const [order, setOrder] = useState({});
  const [disabled, setDisabled] = useState(false);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        
        const response = await axios.get(
          `/api/pharmacyOrders/getOrderDetails/${userId}/${orderId}`
        ,{
          headers:{'Authorization': `Bearer ${user.token}`,
          'idType':user.googleId?'google':'email'}
        });
        setOrder(response.data.order);
        console.log(response.data.order);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, [user]);
  const handleOrderApproval = async () => {
    try {
      await axios.patch(`http://localhost:4000/api/order/approveOrder/${userId}/${orderId}`, {status:"Approved"}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? 'google' : 'email',
        },
      });
      // Handle any additional logic or UI updates after order approval
    } catch (error) {
      console.error(error);
      // Handle error response or display error message to the user
    }
  };
  const handleOrderCancellation = async () => {
    try {
      await axios.patch(`http://localhost:4000/api/order/approveOrder/${userId}/${orderId}`, {status:"Cancelled"}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? 'google' : 'email',
        },
      });
      // Handle any additional logic or UI updates after order approval
    } catch (error) {
      console.error(error);
      // Handle error response or display error message to the user
    }
  };
  
  
  if(order.prescription_image===""){
    return (
      <div>
        <div className="mb-5">
        <NavbarPharmacy id={user._id} user={user}/>
        </div>
        <div>
          <Card className='order-details-card'>
            <Card.Header className='order-details-card-header'>Order Details
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
                </tbody>
              </Table>
            </Card.Body>
            <Card.Footer>
            <Button className="btn btn-approve-order float-end" disabled={(order.status === "Approved" || order.status==="Cancelled")} onClick={handleOrderApproval}>{order.status === "Approved"?"Approved":"Approve"}</Button>
            <Button className="float-end me-2" variant="danger" disabled={(order.status === "Approved" || order.status==="Cancelled")} onClick={handleOrderCancellation}>{order.status === "Cancelled"?"Cancelled":"Cancel"}</Button>
            </Card.Footer>
          </Card>
        </div>
      </div>
    );
  }
  else{
    return (
      <div>
        <div className="mb-5">
        <NavbarPharmacy />
      </div>
        <div>
    <Card className='view-prescription-card'>
      <Card.Header style={{backgroundColor: "#EB006F", textAlign: "center", color: "white", fontSize:"1.5rem"}}>
       Prescription
      </Card.Header>
      <Card.Body>
      <Card.Img variant="top" src={order.prescription_image}/>
      </Card.Body>
      <Card.Footer>
            <Button className="btn btn-approve-order float-end" disabled={(order.status === "Approved" || order.status==="Cancelled")} onClick={handleOrderApproval}>{order.status === "Approved"?"Approved":"Approve"}</Button>
            <Button className="float-end me-2" variant="danger" disabled={(order.status === "Approved" || order.status==="Cancelled")} onClick={handleOrderCancellation}>{order.status === "Cancelled"?"Cancelled":"Cancel"}</Button>
            </Card.Footer>
    </Card>
        </div>
    </div>
    );
  }
  
};

export default OrderDetailsCard;
