import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../Contexts/cartAction.js';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';

export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartState) || [];
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    let price = 0;
    cart.forEach(item => {
      price += item.price;
    });
    setTotalPrice(price);
  }, [cart]);

  if (cart.length === 0) {
    return (
      <div className='d-flex flex-column justify-content-center'>
      <div className='mt-5 w-100 text-center fs-3' style={{ color: 'red' }}>
        The Cart is Empty!
      </div>
      <div className='d-flex justify-content-center'>
        <i class='bx bxs-cart-add' style={{fontSize: '20rem'}} ></i>
      </div>
      </div>
    );
  }

  return (
    <div>
      <div className='container cart-table'>
      <div>
      <h2 style={{textAlign: "center", color: "#EB006F"}}>My Cart</h2>
      </div>
        <Table striped bordered hover responsive>
        
          <thead>
            <tr style={{textAlign: "center"}}>
              <th>#</th>
              <th>Name</th>
              <th>Pcs</th>
              <th>Strips</th>
              <th>Boxes</th>
              <th>Price</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((medicine, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{medicine.MedicineName}</td>
                <td>{medicine.quantityPcs}</td>
                <td>{medicine.quantityStrips}</td>
                <td>{medicine.quantityBoxes}</td>
                <td>{medicine.price}</td>
                <td>
                  <Button
                    className='btn btn-danger'
                    onClick={() => {
                      dispatch(removeItem({ index: index }));
                    }}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
        <div className='d-flex justify-content-between'> 
        <div><Button href={`/checkOutPage`} className='btn btn-checkOut'>
            Check Out
          </Button></div>
        <div>
          <h4 style={{color: "red"}}>Total Price: ৳{totalPrice}</h4>
        </div>
        </div>
          
      </div>
    </div>
  );
}
