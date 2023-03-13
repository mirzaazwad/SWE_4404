import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../index.css";
import "boxicons";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import NavbarPharmacy from "../profile/navbarPharmacy";

  // <tr key={medicine._id} onClick={()=>editMedicine(medicine._id)}>
  // <td> {count+=1} </td> <td> {medicine.MedicineName} </td>{" "}
  // <td> {medicine.GenericName} </td> <td> {medicine.TypeID} </td>{" "}
  // <td> {medicine.Manufacturer} </td>{" "}
  // <td> {medicine.SellingPrice} </td>{" "}
  // <td> {medicine.PurchasePrice} </td> <td> {medicine.amount} </td>{" "}

const Inventory = () => {
  const id=useParams();
  const _id=id.id;
  //const user=useSelector((state) => state.userState.user);
  const [medicines, setMedicines] = useState([]);
  useEffect(()=>{
    axios.get('/api/profile/inventory/getMedicines/'+_id).then(async(result)=>{
      let temp=result.data.Inventory;
      let res=[];
      temp.forEach(async(item)=>{
        let Type="";
        if(item.TypeID!=="Default"){
          const result=await axios.get('/api/profile/inventory/getType/'+item.TypeID);
          Type=result.data.result.Name;
        }
        const medicine={
          _id:item._id,
          MedicineName:item.MedicineName,
          GenericName:item.GenericName,
          Type: Type,
          Manufacturer:item.Manufacturer,
          SellingPrice:item.SellingPrice,
          PurchasePrice:item.PurchasePrice,
          Amount:0
        }
        if(item.TypeID!=="Default"){
          res.push(medicine);
        }
      })
      setMedicines(res);
    });
  },[])
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (type) => {
    setShow(true);
    setType(type);
  };
  const [filterOption, setFilterOption] = useState("");

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    const value = event.target.value;
    setFilteredMedicines(
      medicines.filter((medicine) =>
        medicine[filterOption].toLowerCase().includes(value.toLowerCase())
      )
    );
  };


  useEffect(() => {
    setFilteredMedicines(medicines);
  }, [medicines]);
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);
  
  const editMedicine = (value) =>{
    console.log('editing medicines' + value);
  }

  let count=0;
  if(medicines!==null){
    return (
      <div>
          <div>
          <NavbarPharmacy/>
          </div>
       <section className="inventory-section">  
      <div className="d-flex w-75 m-auto  flex-column">
          <div className="d-flex justify-content-between mb-2">
          <Link to={'/inventoryManagementSystem/addMedicine/'+ id}><Button className="btn btn-add" variant="primary">Add new medicine <i className='bx bx-plus-circle bx-sm' ></i></Button>{' '}</Link>
        <div className="d-flex justify-content-end align-items-center">
        
          <Form.Label className="me-2 mb-0"> Filter By: </Form.Label>{" "}
          <Form.Select className="w-auto me-2" onChange={handleFilterChange}>
            <option value="select..."> select... </option>
            <option value="manufacturer"> Manufacturer </option>{" "}
            <option value="genericName"> Generic Name </option>{" "}
            <option value="type"> Type </option>{" "}
          </Form.Select>{" "}
          <Form.Control
            className="w-auto"
            type="text"
            placeholder="Enter value"
            onChange={handleFilterValueChange}
          />{" "}
        </div>
        </div>
        <div className="d-flex justify-content-center">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> SL </th> <th> Medicine Name </th> <th> Generic Name </th>{" "}
                <th> Type </th> <th> Manufacturer </th> <th> Sell Price </th>{" "}
                <th> Purchase Price </th> <th> Amount </th> <th> Action </th>{" "}
              </tr>{" "}
            </thead>{" "}
            <tbody>
              {" "}
              {filteredMedicines.map((medicine) => (
                <tr key={medicine._id} onClick={()=>editMedicine(medicine._id)}>
                  <td> {count+=1} </td> <td> {medicine.MedicineName} </td>{" "}
                  <td> {medicine.GenericName} </td> <td> {medicine.Type} </td>{" "}
                  <td> {medicine.Manufacturer} </td>{" "}
                  <td> {medicine.SellingPrice} </td>{" "}
                  <td> {medicine.PurchasePrice} </td> <td> {medicine.amount} </td>{" "}
                  <td>
                    <Button
                      variant="secondary"
                      className="mx-0 plusButton"
                      onClick={() => handleShow("add")}
                    >
                      {" "}
                      <i
                        class="bx bxs-plus-circle plusIcon"
                        style={{ fontSize: "24px" }}
                      ></i>
                    </Button>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>
                          {type === "add" ? "Add to stock" : "Remove from stock"}
                        </Modal.Title>
                      </Modal.Header>
                      <Modal.Body>
                        <Form>
                          <Form.Label>Quantity Type:</Form.Label>
                          <Form.Select aria-label="Default select example">
                            <option>Select quantity type</option>
                            <option value="1">Pcs</option>
                            <option value="2">Strips</option>
                            <option value="3">Box</option>
                          </Form.Select>
                          <Form.Label>Quantity:</Form.Label>
                          <Form.Control
                            aria-label="Default"
                            aria-describedby="inputGroup-sizing-default"
                            placeholder="Enter amount"
                            required
                          />
                        </Form>
                      </Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Update
                        </Button>
                      </Modal.Footer>
                    </Modal>
                    <Button
                      variant="danger"
                      className="mx-0 minusButton"
                      onClick={() => handleShow("remove")}
                    >
                      {" "}
                      <i
                        class="bx bxs-minus-circle minusIcon"
                        style={{ fontSize: "24px" }}
                      ></i>{" "}
                    </Button>{" "}
                  </td>{" "}
                </tr>
              ))}{" "}
            </tbody>{" "}
          </Table>{" "}
        </div>{" "}
      </div>
      </section> 
      </div>
    );
  }
  else{
    return (
      <h1>Loading</h1>
    )
  }
};
export default Inventory;
