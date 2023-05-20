import { useState } from "react";
import AccountCard from "./accountOrderCard";
import Pagination from "react-bootstrap/Pagination";
const AccountDisplay = ({orders,user}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(5);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return ( 
    <div className="d-flex justify-content-center" style={{marginTop:'0.8%'}}>
          <div className="d-flex flex-column w-50">
            {currentOrders.map((order) => (
              <AccountCard key={order.index} order={order} user={user} />
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
   );
}
 
export default AccountDisplay;