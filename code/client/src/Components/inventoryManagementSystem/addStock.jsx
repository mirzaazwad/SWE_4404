import axios from "axios";
import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const StockManagement = (props) => {
  const addToStock = (e) => {
    e.preventDefault();
    props.handleClose();
    let currentAmount=0;
    console.log(props.medicines);
    if(props.stockType==="Pcs"){
      console.log(props.medicines[props.current_medicine_index]);
      currentAmount=props.medicines[props.current_medicine_index].Stock.Pcs;
    }
    else if(props.stockType==="Boxes"){
      currentAmount=props.medicines[props.current_medicine_index].Stock.Boxes;
    }
    else{
      currentAmount=props.medicines[props.current_medicine_index].Stock.Strips;
    }
    console.log('pharmacy ID: ',props.pharmacyID)
    axios.patch('/api/profile/inventory/addToStock/'+props.pharmacyID,{
      index:props.current_medicine_index,
      stock:props.stockType,
      amount:Number(props.amount)+Number(currentAmount)
    },{headers: {
      'Authorization': `Bearer ${props.user.token}`,
      'idType':props.user.googleId?'google':'email',
    }})
    window.location.reload();
  };

  const subToStock = (e) => {
    e.preventDefault();
    props.handleClose();
    let currentAmount=0;
    if(props.stockType==="Pcs"){
      currentAmount=props.medicines[props.current_medicine_index].Stock.Pcs;
    }
    else if(props.stockType==="Boxes"){
      currentAmount=props.medicines[props.current_medicine_index].Stock.Boxes;
    }
    else{
      currentAmount=props.medicines[props.current_medicine_index].Stock.Strips;
    }
    if(Number(currentAmount)-Number(props.amount)<0){
      props.setError("Stock cannot be negative");
      return;
    }
    axios.patch('/api/profile/inventory/addToStock/'+props.pharmacyID,{
      index:props.current_medicine_index,
      stock:props.stockType,
      amount:Number(currentAmount)-Number(props.amount)
    },{headers: {
      'Authorization': `Bearer ${props.user.token}`,
      'idType':props.user.googleId?'google':'email'
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
          {props.medicines && props.current_medicine_index && props.medicines[props.current_medicine_index].Type.hasStrips===true && (<option value="Strips">Strips</option>)}
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
      <Button className="btn btn-add" onClick={props.type === "add" ? addToStock : subToStock}>
        Update
      </Button>
    </Modal.Footer>
  </Modal> 
  );
}
 
export default StockManagement;