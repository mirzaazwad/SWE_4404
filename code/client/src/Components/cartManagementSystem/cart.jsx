import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../Contexts/cartAction.js';
import Button from 'react-bootstrap/Button';
import Table from 'react-bootstrap/Table';
import { clearItems } from "../../Contexts/cartAction.js";
import axios from 'axios';
import { useToken } from '../../Hooks/useToken.js';
import {useNavigate } from 'react-router-dom';



export default function Cart() {
  const user=useToken();
  const navigate=useNavigate();
  const userId=user._id;
  const [customerEmail,setCustomerEmail]=useState("");
  const [customerPhoneNumber,setCustomerNumber]=useState("");
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();

  const dispatch = useDispatch();
  const pharmacyManagerID=localStorage.getItem('cartPharmacyManager') || "";
  const cart = useSelector(state => state.cartState) || [];
  const [totalPrice, setTotalPrice] = useState(0);
  const [location,setLocation]=useState(null);
  const [showMAP,setShowMAP]=useState(false);
  const [stopDropDown,setStopDropDown]=useState(false);
  const [error,setError]=useState("");
  const [disabled,setDisabled]=useState(false);
  useEffect(() => {
    const retrieveUser=async ()=>{
      await axios.get('/api/profile/user/getUser/'+userId,{
        headers:{'Authorization': `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email'}
      }).then((result)=>{
        setLocation(result.data.coordinates);
        setAddress(result.data.address);
        setFullName(result.data.username);
        setCustomerNumber(result.data.phone);
        setCustomerEmail(result.data.email);
      })
    }
    retrieveUser();
    let price = 0;
    cart.forEach(item => {
      price += item.price;
    });
    setTotalPrice(price);
  }, [cart]);

  const handleCheckOut = async (e) => {
    console.log(cart);
    console.log(customerEmail);
    e.preventDefault();
    const response =  axios.post(`http://localhost:4000/api/order/postOrder/${userId}`, {
      items: cart,
      customer_data: {
        email:customerEmail,
        phone:customerPhoneNumber,
        pharmacyManagerID:pharmacyManagerID,
        fullName: fullName,
        address: address,
        amount: totalPrice,
      },
    },{
      headers:{'Authorization': `Bearer ${user.token}`,
      'idType':user.googleId?'google':'email'}
    }).then(async (result)=>{  
    });
    
    await dispatch(clearItems());
    navigate('/myOrders');
    
  };

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
                    className="btn btn-delete-cart" style={{color: "white"}}
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
        <div><Button onClick={handleCheckOut} className='btn btn-checkOut'>
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