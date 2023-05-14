import { Switch } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormControlLabel from "@mui/material/FormControlLabel";

const Type = (props) => {
  const [typename,setTypeName]=useState("");
  const [typeDescription,setTypeDescription]=useState("");
  const [showType, setShowType] = useState(false);
  const [typeStrip,setTypeStrip]=useState(false);
  const user=props.user;
  const handleCloseType = () => {
    props.onClosing(false);
    setShowType(false);
  }

  useEffect(()=>{
    setShowType(props.showType);
  },[props.showType])

  const handleType = (e) =>{
    handleCloseType();
    e.preventDefault();
    axios.post('/api/profile/addMedicine/addType',{
      name:typename,
      description:typeDescription,
      strips:typeStrip
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email',
      },
    }).then(result=>console.log(result));
    window.location.reload();
  }

  return (
    <Form onSubmit={handleType}>
      <Modal show={showType} onHide={handleCloseType}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medicine Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Type Name:</Form.Label>
          <Form.Control
            value={typename}
            onChange={(e) => setTypeName(e.target.value)}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Enter Type Name"
            required
          />
          <Form.Label>Description:</Form.Label>
          <Form.Control
            value={typeDescription}
            onChange={(e) => setTypeDescription(e.target.value)}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Enter Type Description"
            required
          />
          <FormControlLabel
            value="start"
            control={
              <Switch
                color="primary"
                onChange={() => setTypeStrip(!typeStrip)}
              />
            }
            label="Strips"
            labelPlacement="start"
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseType}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleType}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default Type;
