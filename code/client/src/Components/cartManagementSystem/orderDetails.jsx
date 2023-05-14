import React, { useState, useEffect } from "react";
import Card from 'react-bootstrap/Card';
import axios from "axios";
import { useParams} from "react-router-dom";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import {Table} from 'react-bootstrap';
import { useToken } from "../../Hooks/useToken";

const OrderDetailsCard = () => {
  const user=useToken();
  const { userId, orderId } = useParams();
  const [order, setOrder] = useState({});

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
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrderDetails();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <NavbarCustomer />
      </div>
      <div>
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
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default OrderDetailsCard;
