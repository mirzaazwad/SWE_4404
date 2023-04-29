import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
const OrderCard = ({ order }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    order.medicines.forEach(item => {
      price += item.price;
    });
    setTotalPrice(price);
  }, [order]);
  return (
    <div>
      <Card className='order-card mb-3 w-100'>
    <Card.Header style={{backgroundColor: "#EB006F", color: "white"}}>Order Id: {order._id}</Card.Header>
    <Card.Body>
      <Card.Text>
        <div className='d-flex justify-content-between'>
        <div><p><i class='bx bx-calendar'></i> {new Date(order.date).toLocaleDateString('en-US')}</p></div>
        <div><p>Total Price: {totalPrice} </p></div>
        </div>
      </Card.Text>
    </Card.Body>
    <Card.Footer>
        <small className="text-muted">Status: <Badge bg="success">{order.status}</Badge></small>
    </Card.Footer>
  </Card>
        </div>
    
  );
};

export default OrderCard;
