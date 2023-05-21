import axios from "axios";
import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";
import Loader from "../partials/loader";
import {PersonBadgeFill,Envelope, PhoneFlip, EnvelopeAtFill} from "react-bootstrap-icons";

const DeliveryManInformation = ({user,orderID}) => {
  const [delivery,setDelivery]=useState(null);

  useEffect(()=>{
    const fetchDeliveryMan=async()=>{
      const result=await axios.get('/api/profile/delivery/getdelivery/'+orderID,{
        headers:{'Authorization': `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email'}
      }).then((result)=>{
        return result.data;
      }).catch((error)=>{
        console.log(error);
      })
      setDelivery(result);
    }

    if(orderID!==null && orderID!==undefined){
      fetchDeliveryMan();
    }
    console.log('delivery',delivery);
  },[orderID,user])

  if(delivery!==null && delivery!==undefined){
    return ( 
      <div className="deliveryManInformation">
        <Card style={{width:'50%', marginLeft:'25%',marginTop:'5%'}}>
          <Card.Header  style={{backgroundColor: "#EB006F", textAlign: "center", color: "white", fontSize:"1.5rem"}}>
            Being Delivered By
          </Card.Header>
          <Card.Body>
          <div className="detailedDeliveryInfo" style={{display:'flex'}}>
          <div className="personInformation" style={{width:'50%'}}>
          <div>
          <span style={{display:'flex'}}><PersonBadgeFill style={{fontSize:'1.5rem'}}/> <p style={{marginLeft:'3%'}}>{delivery.username}</p></span>
          </div>
          <div>
            <span style={{display:'flex'}}><EnvelopeAtFill style={{fontSize:'1.5rem'}}/> <p style={{marginLeft:'3%'}}>{delivery.email}</p></span>
          </div>
          <div>
          <span style={{display:'flex'}}><PhoneFlip style={{fontSize:'1.5rem'}}/> <p style={{marginLeft:'3%'}}>{delivery.phone}</p></span>
          </div>
          </div>
          <div className="personImage" style={{width:'50%',marginLeft:'50%'}}>
            <img src={delivery.imageURL} width="100%" height="100%" style={{borderRadius:'50%'}}/>
          </div>
          </div>
          </Card.Body>
          <Card.Footer>
    
          </Card.Footer>
        </Card>
      </div> 
      );
  }
  else{
    <Loader/>
  }
}
 
export default DeliveryManInformation;