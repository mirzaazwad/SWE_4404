import { Card } from "react-bootstrap";
import Loader from "../partials/loader";
import {PersonBadgeFill,PhoneFlip, EnvelopeAtFill} from "react-bootstrap-icons";
import Button from "react-bootstrap/Button";

const DeliveryManInformation = ({delivery,setShowModal}) => {
  if(delivery!==null && delivery!==undefined){
    return ( 
      <div className="deliveryManInformation">
        <Card style={{width:'50%', marginLeft:'25%',marginTop:'5%'}}>
          <Card.Header  style={{backgroundColor: "#EB006F", textAlign: "center", color: "white", fontSize:"1.5rem"}}>
            {delivery.status==='Delivered'?(<p>Being Delivered By</p>):(<p>Delivered By</p>)}
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
          <Button variant="primary" onClick={()=>{
            console.log('button click');
            setShowModal(true)
          }}>Confirm</Button>
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