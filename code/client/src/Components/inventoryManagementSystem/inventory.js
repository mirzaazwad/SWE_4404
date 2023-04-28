import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../index.css";
import Table from "react-bootstrap/Table";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { useSelector } from "react-redux";
import { useSocket } from "../../Hooks/useSocket";
import AddExistingMedicine from "../partials/inventoryManagement/addExistingMedicine";

const Inventory = () => {
  const user = useSelector((state)=>state.userState.user);
  const [sellerId, setSellerId] = useState();
  const id = useParams();
  const _id = id.id;
  useSocket(_id,[]);
  const [current_medicine_index,setCurrentMedicineIndex]=useState();
  const [medicines, setMedicines] = useState([]);
  const [types, setTypes] = useState([]);
  const [stockType, setStockType] = useState("");
  const [amount, setAmount] = useState(0);
  const [pharmacyID,setPharmacyID]=useState();
  const [error,setError]=useState(null);
  const [medicinesEmpty,setMedicinesEmpty]=useState(true);
  const [showMedicines,setShowMedicines]=useState(false);
  const [loading,setLoading]=useState(false);

  const addToStock = (e) => {
    e.preventDefault();
    handleClose();
    console.log(stockType);
    console.log(amount);
    console.log('pharmacy ID: ',pharmacyID)
    axios.patch('/api/profile/inventory/addToStock/'+pharmacyID,{
      index:current_medicine_index-1,
      stock:stockType.option,
      amount:Number(amount)+Number(medicines[current_medicine_index-1].Amount)
    },{headers: {
      'Authorization': `Bearer ${user.token}`
    }})
    window.location.reload();
  };

  const subToStock = (e) => {
    e.preventDefault();
    handleClose();
    console.log(stockType);
    console.log(amount);
    console.log('pharmacy ID: ',pharmacyID)
    if(Number(medicines[current_medicine_index-1].Amount)-Number(amount)<0){
      setError("Stock cannot be negative");
      return;
    }
    axios.patch('/api/profile/inventory/addToStock/'+pharmacyID,{
      index:current_medicine_index-1,
      stock:stockType.option,
      amount:Number(medicines[current_medicine_index-1].Amount)-Number(amount)
    },{headers: {
      'Authorization': `Bearer ${user.token}`
    }})
    window.location.reload();
  };

  useEffect(() => {
    const retrieveData=async()=>{
      setLoading(true);
      await axios
      .get("/api/profile/user/getUserSellerId/" + _id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setSellerId(response.data._id);
      })
      .catch((err) => console.log(err));
    await axios
      .get("/api/profile/inventory/getTypes", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setTypes(result.data.result);
      });
    await axios
      .get("/api/profile/inventory/getMedicines/" + sellerId, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then( async (result) => {
        if(result.data!==null){
          let temp = result.data.Inventory;
          if(result.data._id!==null){
            setPharmacyID(result.data._id);
          }
          if(result.data!==null){
            if(result.data.Inventory===null){
              setMedicinesEmpty(true);
            }
          }
          let res = [];
          for (let i = 0; i < temp.length; i++) {
            const medicine = {
              _id: i + 1,
              MedicineName: temp[i].MedicineName,
              GenericName: temp[i].GenericName,
              Type: temp[i].TypeID,
              Manufacturer: temp[i].Manufacturer,
              SellingPrice: temp[i].SellingPrice,
              PurchasePrice: temp[i].PurchasePrice,
              Amount: temp[i].Stock.Pcs,
            };
            res.push(medicine);
          }
          setMedicines(res);
          setLoading(false);
        }
      });
    }
    retrieveData();
  }, [sellerId,_id,user.token]);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (type,id) => {
    setCurrentMedicineIndex(id);
    setShow(true);
    setType(type);
  };
  const [filterOption, setFilterOption] = useState("");

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    const value = event.target.value;
    if(value===""){
      setFilteredMedicines(medicines);
    }
    else if(filterOption==="Amount"){
      setFilteredMedicines(
        medicines.filter((medicine) =>
          medicine[filterOption]===value
        )
      );
    }
    else if(value!==null){
      setFilteredMedicines(
        medicines.filter((medicine) =>
          medicine[filterOption].toLowerCase().includes(value.toLowerCase())
        )
      );
    }
  };

  useEffect(() => {
    setFilteredMedicines(medicines);
  },[medicines]);
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);

  const editMedicine = (value) => {
    console.log("editing medicines" + value);
  };

  const handleClosing=(data)=>{
    setShowMedicines(data);
  }

  

  if (!loading) {
    return (
      <div>
        <div>
          <NavbarPharmacy id={_id} user={user}/>
        </div>
        <section className="inventory-section">
          <div className="d-flex w-75 m-auto  flex-column">
            <div className="d-flex justify-content-between mb-2">
                <Button className="btn btn-add" variant="primary" onClick={()=>setShowMedicines(true)}>
                  Add new medicine <i className="bx bx-plus-circle bx-sm"></i>
                </Button>{" "}
              <AddExistingMedicine id={_id} user={user} show={showMedicines} onClosing={handleClosing}/>
              <div className="errorMessage" style={{color:"red"}}>
                {error}
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <Form.Label className="me-2 mb-0"> Filter By: </Form.Label>{" "}
                <Form.Select
                  className="w-auto me-2"
                  onChange={handleFilterChange}
                >
                  <option value="select..."> select... </option>
                  <option value="Manufacturer"> Manufacturer </option>{" "}
                  <option value="GenericName"> Generic Name </option>{" "}
                  <option value="Type"> Type </option>{" "}
                  <option value="MedicineName"> Medicine Name </option>{" "}
                  <option value="Amount"> Amount </option>{" "}
                </Form.Select>{" "}
                <Form.Control
                  className="w-auto"
                  type="text"
                  placeholder="Enter value"
                  onChange={handleFilterValueChange}
                />{" "}
              </div>
            </div>
            <Modal show={show} onHide={handleClose}>
              <Modal.Header closeButton>
                <Modal.Title>
                  {type === "add" ? "Add to stock" : "Remove from stock"}
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Form>
                  <Form.Label>Quantity Type:</Form.Label>
                  <Form.Select
                    aria-label="Default select example"
                    onChange={(e) =>
                      setStockType({ option: e.target.value, amount: amount })
                    }
                  >
                    <option>Select quantity type</option>
                    <option value="Pcs">Pcs</option>
                    <option value="Strips">Strips</option>
                    <option value="Box">Box</option>
                  </Form.Select>
                  <Form.Label>Quantity:</Form.Label>
                  <Form.Control
                    type="number"
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Enter amount"
                    value={amount}
                    onChange={(e)=>setAmount(e.target.value)}
                    required
                  />
                </Form>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={type === "add" ? addToStock : subToStock}>
                  Update
                </Button>
              </Modal.Footer>
            </Modal>
            <div className="d-flex justify-content-center">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th> SL </th> <th> Medicine Name </th>{" "}
                    <th> Generic Name </th> <th> Type </th>{" "}
                    <th> Manufacturer </th> <th> Sell Price </th>{" "}
                    <th> Purchase Price </th> <th> Amount(Pcs) </th>{" "}
                    <th> Action </th>{" "}
                  </tr>{" "}
                </thead>{" "}
                <tbody>
                  {" "}
                  {filteredMedicines.map((medicine) => (
                    <tr
                      key={medicine._id}
                      onClick={() => editMedicine(medicine._id)}
                    >
                      <td> {medicine._id} </td>{" "}
                      <td> {medicine.MedicineName} </td>{" "}
                      <td> {medicine.GenericName} </td>{" "}
                      <td>
                        {" "}
                        {medicine.Type !== "Default"
                          ? types.find((obj) => obj._id === medicine.Type).Name
                          : "Undefined"}{" "}
                      </td>{" "}
                      <td> {medicine.Manufacturer} </td>{" "}
                      <td> {medicine.SellingPrice} </td>{" "}
                      <td> {medicine.PurchasePrice} </td>{" "}
                      <td> {medicine.Amount} </td>{" "}
                      <td>
                        <Button
                          variant="secondary"
                          className="mx-0 plusButton"
                          onClick={() => handleShow("add",medicine._id)}
                        >
                          {" "}
                          <i
                            className="bx bxs-plus-circle plusIcon"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </Button>
                        <Button
                          variant="danger"
                          className="mx-0 minusButton"
                          onClick={() => handleShow("remove",medicine._id)}
                        >
                          {" "}
                          <i
                            className="bx bxs-minus-circle minusIcon"
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
  } else {
    return (
      <div class="spinner-border text-primary" role="status" style={{marginLeft:'50%',marginTop:'10%'}}>
        <span class="visually-hidden">Loading...</span>
      </div>
    )
  }
};
export default Inventory;
