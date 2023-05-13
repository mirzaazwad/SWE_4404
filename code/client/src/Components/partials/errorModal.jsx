import { Modal } from "react-bootstrap";

const ErrorModal = ({error,setError}) => {
  return ( 
  <Modal show={error!==""} onHide={()=>setError("")} style={{marginTop:"10vh",marginLeft:"50vh",width:"100vh",height:"100vh"}}>
  <Modal.Header style={{backgroundColor:"#103686",color:"white"}} closeButton>Error</Modal.Header>
  <Modal.Body>
  <div className="errorMessage" style={{color:"red"}}>
    {error}
  </div>
  </Modal.Body>
</Modal> 
);
}
 
export default ErrorModal;