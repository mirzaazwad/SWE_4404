import { useLoadScript } from "@react-google-maps/api";
import MapCard from "./googleMapCard";
import Loading from "./mapLoading";
const libraries= [`${process.env.REACT_APP_LIBRARY}`];

const MapDelivery = ({location,setLocation,orders}) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMPKEY,
    libraries,
  });
  if (!isLoaded) {
    return (<Loading></Loading>)
  } 
  else{
    return (<MapCard currentLocation={location} setLocation={setLocation} orders={orders}></MapCard>)
  }
}

 
export default MapDelivery;