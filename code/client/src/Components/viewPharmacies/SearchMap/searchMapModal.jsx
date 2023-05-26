import { useEffect, useMemo, useState } from "react";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Button, Form, Modal } from "react-bootstrap";
import PlacesAutocomplete from "../../partials/Map/placesAutocomplete";
import { useNavigate } from "react-router-dom";


const SearchMapModal = (props)=>{
  const navigate=useNavigate();
  const [address,setAddress]=useState("");
  const center = useMemo(() => (props.currentLocation!==null?props.currentLocation:{lat:null,lng:null}), [props.currentLocation]);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [error,setError]=useState("");
  const [isValid,setIsValid]=useState(false);

  useEffect(()=>{
    setMarkerPosition(props.currentLocation);
    if(props.currentLocation){
      setIsValid(true);
    }
  },[props.currentLocation])

  const handleMapClick = (event) => {
    setIsValid(true);
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const iconStyle = {
    url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
    scaledSize: new window.google.maps.Size(30, 40),
    anchor: { x: 20, y: 20 }
  };

  const getPlaceDetails = async (lat, lng) => {
    if(!lat || !lng){
      return null;
    }
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GMPKEY}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      return data.results[0].formatted_address;
    } else {
      console.log("Geocode was not successful for the following reason:", data.status);
      return null;
    }
  };

  const setNewAddress=async()=>{
    if(markerPosition){
      setAddress(await getPlaceDetails(markerPosition.lat,markerPosition.lng));
      setIsValid(true);
    }
  }

  useEffect(()=>{
    setIsValid(true);
    setNewAddress();
  },[markerPosition,setMarkerPosition])

  const handleMarkerDragEnd = (event) => {
    setIsValid(true);
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const getUserLocation = () => {
    props.startDropDown(false);
    setIsValid(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setMarkerPosition(userLocation);
      });
    } else {
      console.log('cant get location in legacy browser');
    }
  };

  const setLocation=(e)=>{
    e.preventDefault();
    if(isValid){
      setError("");
      props.setLocation(markerPosition);
      props.handleClose();
    }
    else{
      setError("Address is invalid");
    }
  }
  return ( 
    <Modal show={props.show} onHide={props.handleClose} style={{marginLeft:"50vh",width:"100vh",height:"100vh"}}>
      <Modal.Header closeButton>
         <Modal.Title>Add Location</Modal.Title>
      </Modal.Header>
      <Form onSubmit={setLocation}>
      <Modal.Body>
      <div className="errorMessage" style={{color:"red"}}>{error}</div>
      <div className="places-container">
        <PlacesAutocomplete startDropDown={props.startDropDown} dropdown={props.dropdown} currentAddress={address} setNewPosition={setMarkerPosition} isValid={isValid} setIsValid={setIsValid}/>
      </div>
        <GoogleMap zoom={16} center={markerPosition} mapContainerClassName="map-container" onClick={handleMapClick}>
        {markerPosition && (
        <MarkerF
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
          icon={iconStyle}
          visible={true}
          label={"You"}
        />
      )}
      {props.pharmacies.map((pharmacy,index)=>(
        <MarkerF
        position={pharmacy.coordinates}
        onClick={()=>navigate(`/Pharmacy?id=${pharmacy.id}&pid=${pharmacy.pharmacyManagerID}&cid=${props.customerId}`)}
        visible={true}
        key={index}
        label={pharmacy.name}
      >
      </MarkerF>
      ))}
        </GoogleMap>
      </Modal.Body>
      <Modal.Footer><Button onClick={getUserLocation}>Search Nearby Pharmacies</Button>
      <Button type="submit">Set Location</Button>
      </Modal.Footer>
      </Form>
    </Modal>
   );
}

export default SearchMapModal;