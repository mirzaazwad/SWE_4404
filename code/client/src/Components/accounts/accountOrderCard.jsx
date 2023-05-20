import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';

const AccountCard = ({ order, user }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [statusColor, setStatusColor] = useState('warning');
  
  useEffect(() => {
    if (order.status === 'Pending') {
      setStatusColor('warning');
    }
    else if (order.status === 'Approved') {
      setStatusColor('info');
    }
    else if (order.status === 'In progress') {
      setStatusColor('secondary');
    }
    else if (order.status === 'Delivered') {
      setStatusColor('success');
    } else if (order.status === 'Cancelled') {
      setStatusColor('danger');
    }
    else{
      setStatusColor('primary');
    }
    let price = 0;
    order.medicines.forEach(item => {
      price += item.price;
    });
    setTotalPrice(price);
  }, [order]);

  return (
    
        <Card className='order-card mb-3 w-100'>
          <Card.Header style={{backgroundColor: "#EB006F", color: "white"}}>
            Order Id: {order._id}
          </Card.Header>
          <Card.Body>
            <Card.Text>
              <div className='d-flex justify-content-between'>
                <div>
                  <p>
                    <i className='bx bx-calendar'></i> {new Date(order.date).toLocaleString()}
                  </p>
                </div>
                <div>
                  <p>Amount: {totalPrice} </p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Status: <Badge bg={statusColor}>{(order.status==="Approved" && order.payment_status===false && "In Progress")||((order.status==="Approved" && order.payment_status===true && "Done"))}</Badge>
            </small>
          </Card.Footer>
        </Card>
      
  );
};

export default AccountCard;
