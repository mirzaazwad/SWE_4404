import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useToken } from "../../Hooks/useToken";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const user = useToken();
  const userId = user._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`http://localhost:4000/api/order/getOrder/${userId}`,{
          headers:{'Authorization': `Bearer ${user.token}`}
        });
        const sortedOrders = res.data.order_data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setOrders(sortedOrders);
      } catch (err) {
        if (err.response && err.response.status === 401) {
            console.log("Failed to fetch order");
        } else {
          console.error(err);
        }
      }
    };
  
    fetchOrders();
  }, []);

  return (
    <div>
      <div className="mb-5">
        <NavbarCustomer />
      </div>
      <div className='my-orders d-flex justify-content-center'>
          <div className="d-flex flex-column w-50">
          {orders.map((order) => (
              <OrderCard key={order.index} order={order} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default MyOrders;
