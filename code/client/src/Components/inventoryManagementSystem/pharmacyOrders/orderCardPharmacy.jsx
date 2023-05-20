import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useToken } from '../../../Hooks/useToken';
import Button from 'react-bootstrap/Button';

const OrderCard = ({ order, user }) => {
  const [totalPrice, setTotalPrice] = useState(0);
  const [statusColor, setStatusColor] = useState('warning');
  const [status,setStatus] = useState(order.status);
  useEffect(() => {
    if (order.status === 'Pending') {
      setStatusColor('warning');
      setStatus('Pending');
    }
    else if (order.status === 'Approved') {
      setStatusColor('info');
      setStatus('Approved');
    }
    else if (order.status === 'In progress') {
      setStatusColor('secondary');
      setStatus('In progress');
    }
    else if (order.status === 'Delivered') {
      setStatusColor('success');
      setStatus('Delivered');
    } else if (order.status === 'Cancelled') {
      setStatusColor('danger');
      setStatus('Cancelled');
    }
    else{
      setStatusColor('primary');
      setStatus('Pending');
    }
    if(order.payment_status===true){
      setStatusColor('secondary');
      setStatus('In progress');
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
                  <p>Total Price: {totalPrice} </p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Status: <Badge bg={statusColor}>{status}</Badge>
            </small>
            
            <Button className="btn btn-sm btn-viewDetails mx-2" href={`/getOrderDetails/${user._id}/${order._id}`}  style={{ float: 'right' }}>
              View details
            </Button>
          </Card.Footer>
        </Card>
      
  );
};

export default OrderCard;
