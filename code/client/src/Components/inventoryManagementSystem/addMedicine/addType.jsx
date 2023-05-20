import { Switch } from "@mui/material";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";
import FormControlLabel from "@mui/material/FormControlLabel";

const Type = ({showType,user}) => {
  const [typename,setTypeName]=useState("");
  const [typeDescription,setTypeDescription]=useState("");
  const [typeStrip,setTypeStrip]=useState(false);

  const handleType = async(e) =>{
    e.preventDefault();
    let obj = Object.create(Object.getPrototypeOf(user.medicines), Object.getOwnPropertyDescriptors(user.medicines));
    await obj.addType(typename,typeDescription,typeStrip);
    user.setMedicines(obj);
    showType.onClosing(false);
  }

  return (
    <Form onSubmit={handleType}>
      <Modal show={showType.show} onHide={()=>showType.onClosing(false)}>
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
          <Button variant="secondary" onClick={()=>showType.onClosing(false)}>
            Close
          </Button>
          <Button className="btn btn-add" type="submit" onClick={handleType}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default Type;
