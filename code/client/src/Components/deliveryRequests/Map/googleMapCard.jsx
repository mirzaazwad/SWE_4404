import { useEffect, useMemo, useState } from "react";
import { GoogleMap, MarkerF,DirectionsRenderer } from "@react-google-maps/api";
import { Button, Form, Card } from "react-bootstrap";


const MapCard = (props)=>{
  const center = useMemo(() => (props.currentLocation!==null?props.currentLocation:{lat:null,lng:null}), [props.currentLocation]);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [error,setError]=useState("");
  const [directions,setDirections]=useState(null);

  useEffect(()=>{
    setMarkerPosition(props.currentLocation);
  },[props.currentLocation])

  useEffect(()=>{
    if(props.currentLocation!==null && props.currentLocation!==undefined && props.routeLocation!==null && props.routeLocation!==undefined){
      calculateRoute(props.currentLocation,props.routeLocation);
    }
  },[props.routeLocation])


  const iconStyle = {
    url: '/marker.png',
    scaledSize: new window.google.maps.Size(30, 40),
    anchor: { x: 20, y: 20 }
  };

  const calculateRoute = (origin,destination) => {
    const directionsService = new window.google.maps.DirectionsService();

    directionsService.route(
      {
        origin,
        destination,
        travelMode: window.google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === window.google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error('Error calculating route:', status);
          setDirections(null);
        }
      }
    );
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        props.setLocation(userLocation);
        setMarkerPosition(userLocation);
      });
    } else {
      console.log('cant get location in legacy browser');
    }
  };
  return ( 
    <Card show={props.show} style={{marginLeft:"0%",height:"100%"}}>
      <Card.Header closeButton>
         <Card.Title>Current Location And Available Orders</Card.Title>
      </Card.Header>
      <Card.Body style={{height:'82vh'}}>
      <div className="errorMessage" style={{color:"red"}}>{error}</div>
      <div className="d-flex" style={{height:'100%'}}>
      <GoogleMap zoom={15} center={markerPosition} mapContainerClassName="map-container">
        {markerPosition && (
        <MarkerF
          position={markerPosition}
          icon={iconStyle}
          visible={true}
          label={"You"}
        />
      )}
      {props.orders.map((order,index)=>(
        <MarkerF
        position={order.coordinates}
        visible={true}
        key={index}
        label={order.pharmacy}
        onClick={()=>calculateRoute(order.coordinates,markerPosition)}
      >
      </MarkerF>
      ))}
      {directions && <DirectionsRenderer directions={directions} />}
        </GoogleMap>
      </div>
      </Card.Body>
      <Card.Footer><Button onClick={getUserLocation}>Get Current Location</Button>
      {!props.currentLocation && (<p>Enable Location Services and reload to View Map</p>)}
      </Card.Footer>
    </Card>
   );
}

export default MapCard;