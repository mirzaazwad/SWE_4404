import React from 'react';
import Card from 'react-bootstrap/Card';

const OrderDetailsCard = ({ order }) => {
  return (
    <Card>
    <Card.Header>{order._id}</Card.Header>
    <Card.Body>
      <Card.Title>{order.productName}</Card.Title>
      <Card.Text>
        <p>Quantity: {order.quantity}</p>
        <p>Status: {order.status}</p>
        <p>Price: {order.price}</p>
      </Card.Text>
    </Card.Body>
  </Card>
  );
};

export default OrderDetailsCard;