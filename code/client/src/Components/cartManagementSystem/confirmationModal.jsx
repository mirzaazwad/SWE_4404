import { useState } from "react";
import {Button, Modal} from "react-bootstrap";
import {PersonBadgeFill,PhoneFlip, EnvelopeAtFill} from "react-bootstrap-icons";
import Loader from "../partials/loader";
import axios from "axios";

const ConfirmationModal = ({delivery,user,showModal,orderID}) => {
  console.log(orderID);
  console.log(user);
  console.log(delivery);
  const handleConfirmation=async()=>{
    const result=await axios.patch('/api/delivery/updateOrder/'+delivery._id,
      {orderID:orderID}
    ,{
      headers:{'Authorization': `Bearer ${user.token}`,
      'idType':user.googleId?'google':'email'}
    }).then((result)=>{
      return result.data.success;
    }).catch((error)=>{
      console.log(error);
    })
    if(result){
      setShow(false);
    }
  }

  const handleDecline=async()=>{
    const result=await axios.patch('/api/delivery/resetStatus/'+delivery._id,{orderID:orderID},{
      headers:{'Authorization': `Bearer ${user.token}`,
      'idType':user.googleId?'google':'email'}
    }).then((result)=>{
      return result.data.success;
    }).catch((error)=>{
      console.log(error);
    })
    if(result){
      setShow(false);
    }
  }


  const [show,setShow]=useState(showModal);

  if(delivery!==undefined && delivery!==null){
    return ( 
      <div className="confirmationModal">
        <Modal show={show} onHide={()=>setShow(false)}>
        <Modal.Title className="text-center">Confirm Delivery</Modal.Title>
        <Modal.Header closeButton>Please Confirm That Your Order Has Been Delivered By</Modal.Header>
        <Modal.Body>
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
              <div className="personImage" style={{width:'50%'}}>
                <img src={delivery.imageURL} width="100%" height="100%" style={{borderRadius:'50%'}}/>
              </div>
              </div>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn btn-checkOut" onClick={handleConfirmation}>
            Confirm
          </Button>
          <Button className="btn btn-checkOut" onClick={handleDecline}>
            Decline
          </Button>
        </Modal.Footer>
        </Modal>
      </div> 
      );
  }
  else{
    return(
      <Loader/>
    )
  }
}
 
export default ConfirmationModal;