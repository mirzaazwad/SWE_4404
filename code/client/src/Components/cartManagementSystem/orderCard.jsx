import React from 'react';
import Card from 'react-bootstrap/Card';
import Badge from 'react-bootstrap/Badge';
import { useState, useEffect } from 'react';
import { useToken } from '../../Hooks/useToken';
import Button from 'react-bootstrap/Button';

const OrderCard = ({ order }) => {
  const user=useToken();
  const userId = user._id;
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
                  <p>Total Price: {totalPrice} </p>
                </div>
              </div>
            </Card.Text>
          </Card.Body>
          <Card.Footer>
            <small className="text-muted">
              Status: <Badge bg={statusColor}>{order.status}</Badge>
            </small>
            
            <Button className="btn btn-sm btn-viewDetails mx-2" href={`/orderDetails/${userId}/${order._id}`}  style={{ float: 'right' }}>
              View details
            </Button>
           
            {order.status === 'Approved' && (
            <Button className="btn btn-sm btn-viewDetails mx-2" href={`/checkOutPage?oid=${order._id}`} style={{ float: 'right' }}>
              Go to billing page
            </Button>
          )}
          </Card.Footer>
        </Card>
      
  );
};

export default OrderCard;