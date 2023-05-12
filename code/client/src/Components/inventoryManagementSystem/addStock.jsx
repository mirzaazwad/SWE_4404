import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const StockManagement = (props) => {
  const addToStock = (e) => {
    e.preventDefault();
    props.handleClose();
    let currentAmount=0;
    if(props.stockType==="Pcs"){
      currentAmount=props.medicines[props.current_medicine_index-1].Amount.Pcs;
    }
    else if(props.stockType==="Boxes"){
      currentAmount=props.medicines[props.current_medicine_index-1].Amount.Boxes;
    }
    else{
      currentAmount=props.medicines[props.current_medicine_index-1].Amount.Strips;
    }
    console.log('pharmacy ID: ',props.pharmacyID)
    axios.patch('/api/profile/inventory/addToStock/'+props.pharmacyID,{
      index:props.current_medicine_index-1,
      stock:props.stockType,
      amount:Number(props.amount)+Number(currentAmount)
    },{headers: {
      'Authorization': `Bearer ${props.user.token}`
    }})
    window.location.reload();
  };

  const subToStock = (e) => {
    e.preventDefault();
    props.handleClose();
    let currentAmount=0;
    if(props.stockType==="Pcs"){
      currentAmount=props.medicines[props.current_medicine_index-1].Amount.Pcs;
    }
    else if(props.stockType==="Boxes"){
      currentAmount=props.medicines[props.current_medicine_index-1].Amount.Boxes;
    }
    else{
      currentAmount=props.medicines[props.current_medicine_index-1].Amount.Strips;
    }
    if(Number(currentAmount)-Number(props.amount)<0){
      props.setError("Stock cannot be negative");
      return;
    }
    axios.patch('/api/profile/inventory/addToStock/'+props.pharmacyID,{
      index:props.current_medicine_index-1,
      stock:props.stockType,
      amount:Number(currentAmount)-Number(props.amount)
    },{headers: {
      'Authorization': `Bearer ${props.user.token}`
    }})
    window.location.reload();
  };
  return ( 
  <Modal show={props.show} onHide={props.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>
        {props.type === "add" ? "Add to stock" : "Remove from stock"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Label>Quantity Type:</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            props.setStockType(e.target.value)
          }
        >
          <option>Select quantity type</option>
          <option value="Pcs">Pcs</option>
          <option value="Strips">Strips</option>
          <option value="Boxes">Boxes</option>
        </Form.Select>
        <Form.Label>Quantity:</Form.Label>
        <Form.Control
          type="number"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Enter amount"
          value={props.amount}
          onChange={(e)=>props.setAmount(e.target.value)}
          required
        />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={props.handleClose}>
        Close
      </Button>
      <Button variant="primary" onClick={props.type === "add" ? addToStock : subToStock}>
        Update
      </Button>
    </Modal.Footer>
  </Modal> 
  );
}
 
export default StockManagement;