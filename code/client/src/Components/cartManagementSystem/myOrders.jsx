import React, { useState, useEffect } from "react";
import OrderCard from "./orderCard";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useToken } from "../../Hooks/useToken";
import Pagination from "react-bootstrap/Pagination";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5); // Number of orders to display per page
  const user = useToken();
  const userId = user._id;

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`/api/order/getOrder/${userId}`, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            idType: user.googleId ? "google" : "email",
          },
        });
        const sortedOrders = res.data.order_data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
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

  // Calculate the indexes of orders to be displayed on the current page
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  // Change the page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div>
      <div className="mb-5">
        <NavbarCustomer />
      </div>
      <div className="my-orders d-flex justify-content-center">
        <div className="d-flex flex-column w-50">
          {currentOrders.map((order) => (
            <OrderCard key={order.index} order={order} />
          ))}
          {orders.length > ordersPerPage && (
            <Pagination className="m-auto py-3">
              <Pagination.First
                onClick={() => paginate(1)}
                disabled={currentPage === 1}
              />
              <Pagination.Prev
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
              />
              {currentPage > 2 && (
                <Pagination.Ellipsis onClick={() => paginate(currentPage - 2)} />
              )}
              {currentPage > 1 && (
                <Pagination.Item onClick={() => paginate(currentPage - 1)}>
                  {currentPage - 1}
                </Pagination.Item>
              )}
              <Pagination.Item active>{currentPage}</Pagination.Item>
              {currentPage < Math.ceil(orders.length / ordersPerPage) && (
                <Pagination.Item onClick={() => paginate(currentPage + 1)}>
                  {currentPage + 1}
                </Pagination.Item>
              )}
              {currentPage < Math.ceil(orders.length / ordersPerPage) - 1 && (
                <Pagination.Ellipsis onClick={() => paginate(currentPage + 2)} />
              )}
              <Pagination.Next
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
              />
              <Pagination.Last
                onClick={() => paginate(Math.ceil(orders.length / ordersPerPage))}
                disabled={currentPage === Math.ceil(orders.length / ordersPerPage)}
              />
            </Pagination>
          )}
        </div>
      </div>
      </div>
  );
};

export default MyOrders;
