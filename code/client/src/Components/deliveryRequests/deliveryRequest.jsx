import { useEffect, useState } from "react";
import { useToken } from "../../Hooks/useToken";
import NavbarDelivery from "../partials/profile/navbarDelivery";
import MapDelivery from "./Map/mapCard";
import Loader from "../partials/loader";
import axios from "axios";
import DeliveryArray from "./deliveryArray";

const DeliveryRequest = () => {
  const user = useToken();
  const [location, setLocation] = useState(null);
  const [orders, setOrders] = useState(null);
  const [routeLocation,setRouteLocation]=useState(null);

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
        .get("/api/delivery", {
          headers: {
            Authorization: `Bearer ${user.token}`,
            idType: user.googleId ? "google" : "email",
          },
        })
        .then((result) => result.data.result);
        setOrders(result);
    };
    intervalId();
  }, []);

  if (orders) {
    return (
      <div className="deliveryRequest" style={{ display: "flex" }}>
        <NavbarDelivery />
        <div
          className="showMap"
          style={{ height: "100%", width: "50%", display: "relative" }}
        >
          <MapDelivery
            location={location}
            setLocation={setLocation}
            orders={orders}
            routeLocation={routeLocation}
          />
        </div>
        <DeliveryArray orders={orders} location={location} setOrders={setOrders} user={user} setRouteLocation={setRouteLocation}/>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default DeliveryRequest;
