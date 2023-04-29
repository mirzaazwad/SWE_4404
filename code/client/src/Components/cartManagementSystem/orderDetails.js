import React from 'react';
import Card from 'react-bootstrap/Card';
import NavbarCustomer from "../partials/profile/navbarCustomer";

const OrderDetailsCard = ({ order }) => {
  return (
    <div>
      <div className="mb-5">
        <NavbarCustomer />
      </div>
      <div>
      <Card className='order-details-card'>
    <Card.Header className='order-details-card-header'>Order Details</Card.Header>
    <Card.Body>
      
    </Card.Body>
  </Card>
      </div>

    </div>
    
  );
};

export default OrderDetailsCard;