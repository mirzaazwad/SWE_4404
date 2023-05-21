import { useEffect, useState } from "react";
import DeliveryCard from "./deliveryCard";
import Pagination from "react-bootstrap/Pagination";

const DeliveryArray = ({orders,location,setOrders,user}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(2);
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  useEffect(()=>{
    const sortOrders = async() => {
      if(!orders){
        return;
      }
      const result = orders;
      await result.sort((a, b) => {
        const distanceA = Math.sqrt(
          (a.coordinates.lat - location.lat)*(a.coordinates.lat - location.lat) + (a.coordinates.lng - location.lng)*(a.coordinates.lng - location.lng)
        );
        const distanceB = Math.sqrt(
          (b.coordinates.lat - location.lat)*(b.coordinates.lat - location.lat) + (b.coordinates.lng - location.lng)*(b.coordinates.lng - location.lng)
        );
        return distanceA-distanceB;
      });
      setOrders(result);
    };
    sortOrders();
  },[orders,location])
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

  return ( 
    <div className="deliveryArray float-end"
    style={{
      height: "100%",
      position: "relative",
      marginTop: "5%",
      marginLeft: "1%",
      marginRight: "1%",
      width: "50%",
    }}>
                {currentOrders.map((order) => (
            <DeliveryCard order={order} user={user}/>
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
   );
}
 
export default DeliveryArray;