import { useEffect, useState } from "react";
import { useToken } from "../../Hooks/useToken";
import NavbarDelivery from "../partials/profile/navbarDelivery";
import MapDelivery from "./Map/mapCard";
import Loader from "../partials/loader";
import axios from "axios";
import DeliveryArray from "./deliveryArray";

const DeliveryHistory = () => {
  const user = useToken();
  const [location, setLocation] = useState(null);
  const [orders, setOrders] = useState(null);

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setLocation(userLocation);
        });
      } else {
        console.log("cant get location in legacy browser");
      }
    };
    getUserLocation();
  }, []);

  useEffect(() => {
    
    const intervalId = async () => {
      let result = await axios
        .get("/api/profile/delivery/history/"+user._id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            idType: user.googleId ? "google" : "email",
          },
        })
        .then((result) => {
          console.log(result);
          return result.data
        });
      setOrders(result);
    };
    intervalId();
  }, []);

  if (true) {
    return (
      <div className="deliveryRequest" style={{ display: "flex" }}>
        <NavbarDelivery />
        {(orders!==undefined && orders!==null) && <DeliveryArray orders={orders} location={location} setOrders={setOrders} user={user}/>}
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default DeliveryHistory;
