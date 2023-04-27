import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { removeItem,clearItems } from '../../Contexts/cartAction.js';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
export default function Cart() {
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartState) || [];
  if (cart.length === 0) {
    return (
      <div>
        <div className='m-5 w-100 text-center fs-3' style={{color: 'white'}}>The Cart is Empty!</div>
      </div>
    )
  }

  const handleCheckOut = async () => {
    let user = JSON.parse(localStorage.getItem("user"));
    let userId = user._id;
    await axios.post(`http://localhost:4000/api/order/postOrder/${userId}`, {
      items: cart
    });
    await dispatch(clearItems());
  }

  let totalPrice = 10;
  return (
    <div>

      {console.log(cart)}
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md'>
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col'>#</th>
              <th scope='col'>Name</th>
              <th scope='col'>Quantity</th>
              <th scope='col'>Option</th>
              <th scope='col'>Amount</th>
              <th scope='col'></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((medicine, index) => (
              <tr>
                <th scope='row'>{index + 1}</th>
                <td>{medicine.id}</td>
                <td>{medicine.medicineId}</td>
                <td>{medicine.size}</td>
                <td>{medicine.price}</td>
                <td>
                  <Button className="btn btn-delete p-0" onClick={() => {dispatch({type:"REMOVE",index:index})}}>Delete</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
    </div>
  )
}
