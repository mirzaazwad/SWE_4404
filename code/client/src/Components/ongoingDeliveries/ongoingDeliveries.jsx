import { useEffect, useState } from "react";
import { useToken } from "../../Hooks/useToken";
import NavbarDelivery from "../partials/profile/navbarDelivery";
import MapDelivery from "./Map/mapCard";
import Loader from "../partials/loader";
import axios from "axios";
import DeliveryArray from "./deliveryArray";
import CollapsibleChat from '../viewPharmacies/collapsibleChat/collapsableChat';

const OngoingDeliveries = () => {
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
      const retrieveOrders = async () => {
      let result = await axios
        .get("/api/profile/delivery/ongoing/"+user._id, {
          headers: {
            Authorization: `Bearer ${user.token}`,
            idType: user.googleId ? "google" : "email",
          },
        })
        .then((result) => result.data.Delivery);
        console.log(result);
        setOrders(result);
    }
    retrieveOrders();
  },[]);

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
          />
        </div>
        <DeliveryArray orders={orders} location={location} setOrders={setOrders} user={user}/>
        <div className="chatOption" style={{display:'flex'}}>
          <div className="deliveryChat" style={{width:'50%'}}>
          <CollapsibleChat senderID={user._id} receiverID={user._id} JWT={user} />
          </div>
          <div className="deliveryChatFixing" style={{width:'50%'}}>
          <CollapsibleChat senderID={user._id} receiverID={user._id} JWT={user} />
          </div>
          </div>
      </div>
    );
  } else {
    return <Loader />;
  }
};

export default OngoingDeliveries;
