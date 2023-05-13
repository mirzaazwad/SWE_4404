import { useEffect, useMemo, useState } from "react";
import PlacesAutocomplete from "./placesAutocomplete";
import { GoogleMap, MarkerF } from "@react-google-maps/api";
import { Button, Form, Modal } from "react-bootstrap";


const MapModal = (props)=>{
  console.log('props.current location: ',props.currentLocation);
  const center = useMemo(() => (props.currentLocation!==null?props.currentLocation:{lat:null,lng:null}), [props.currentLocation]);
  console.log('center: ',center);
  const [markerPosition, setMarkerPosition] = useState(center);
  const [error,setError]=useState("");
  const [isValid,setIsValid]=useState(false);

  const handleMapClick = (event) => {
    setIsValid(true);
    setMarkerPosition({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };

  const getPlaceDetails = async (lat, lng) => {
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
    props.setAddress(await getPlaceDetails(markerPosition.lat,markerPosition.lng));
    setIsValid(true);
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
        <PlacesAutocomplete startDropDown={props.startDropDown} dropdown={props.dropdown} currentAddress={props.address} setNewPosition={setMarkerPosition} isValid={isValid} setIsValid={setIsValid}/>
      </div>
        <GoogleMap zoom={16} center={markerPosition} mapContainerClassName="map-container" onClick={handleMapClick}>
        {markerPosition && (
        <MarkerF
          position={markerPosition}
          draggable={true}
          onDragEnd={handleMarkerDragEnd}
          visible={true}
        />
      )}
        </GoogleMap>
      </Modal.Body>
      <Modal.Footer><Button onClick={getUserLocation}>Get Current Location</Button>
      <Button type="submit">Set Location</Button>
      </Modal.Footer>
      </Form>
    </Modal>
   );
}

export default MapModal;