import { Modal } from "react-bootstrap";
import Loader from "../loader";

const Loading = (props) =>{
  return (
      <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
      </Modal.Header>
      <Modal.Body>
      <Loader></Loader>
      </Modal.Body>
    </Modal>
  );
}

export default Loading;