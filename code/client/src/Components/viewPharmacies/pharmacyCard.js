import React from 'react';
import { useEffect, useState } from "react";
import { Card } from 'react-bootstrap';

const PharmacyCard = (props) => {

  const [address,setAddress]=useState("");
  
  const getPlaceDetails = async (lat, lng) => {
    const response = await fetch(
      `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GMPKEY}`
    );
    const data = await response.json();
    if (data.status === "OK") {
      setAddress(data.results[0].formatted_address);
      return data.results[0].formatted_address;
    } else {
      console.log("Geocode was not successful for the following reason:", data.status);
      return null;
    }
  };

  useEffect(()=>{
    if(props.location){
      getPlaceDetails(props.location.lat,props.location.lng);
    }
  },[props])

  return (
    <Card
      className="pharmacy-card"
    >
      <Card.Img variant="top" src={props.image} className="pharmacy-card-image" />
      <Card.Body >
        <Card.Title>{props.name}</Card.Title>
        <Card.Text>{address}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default PharmacyCard;
