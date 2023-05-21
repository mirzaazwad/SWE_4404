import { useEffect } from "react";
import DeliveryCard from "./deliveryCard";

const DeliveryArray = ({orders,location,setOrders}) => {
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
      {orders.map((order) => (
            <DeliveryCard order={order} />
          ))}
    </div>
   );
}
 
export default DeliveryArray;