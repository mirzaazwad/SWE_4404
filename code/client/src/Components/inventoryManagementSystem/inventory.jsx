import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../../index.css";
import Table from "react-bootstrap/Table";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { useSocket } from "../../Hooks/useSocket";
import AddExistingMedicine from "../partials/inventoryManagement/addExistingMedicine";
import { useToken } from "../../Hooks/useToken";
import StockManagement from "../partials/inventoryManagement/addStock";

const Inventory = () => {
  const user=useToken();
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
  const [showMedicines,setShowMedicines]=useState(false);
  const [loading,setLoading]=useState(false);
  const [togglePcs,setTogglePcs]=useState(0);
  const [filterChangeValue,setFilterChangeValue]=useState("");

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
              Amount:{...temp[i].Stock},
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

  const filterByToggle = async (toggleVal)=>{
    setTogglePcs(toggleVal);
    if(toggleVal===2){
      setFilteredMedicines(filteredMedicines.filter((medicines)=>medicines.Amount.hasOwnProperty('Strips')));
    }
    else{
      console.log('Filter Change Value is: ',filterChangeValue);
      handleFilterValueChange(filterChangeValue);
    }
  }

  const handleFilterValueChange = (event) => {
    const value = event;
    setFilterChangeValue(value);
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
                </Button>
              <AddExistingMedicine id={_id} user={user} show={showMedicines} onClosing={handleClosing}/>
              <div className="errorMessage" style={{color:"red"}}>
                {error}
              </div>
              <div className="d-flex justify-content-end align-items-center">
                <Form.Label className="me-2 mb-0"> Filter By: </Form.Label>
                <Form.Select
                  className="w-auto me-2"
                  onChange={handleFilterChange}
                >
                  <option value="select..."> select... </option>
                  <option value="Manufacturer"> Manufacturer </option>
                  <option value="GenericName"> Generic Name </option>
                  <option value="Type"> Type </option>
                  <option value="MedicineName"> Medicine Name </option>
                  <option value="Amount"> Amount </option>
                </Form.Select>
                <Form.Control
                  className="w-auto"
                  type="text"
                  placeholder="Enter value"
                  onChange={(e)=>handleFilterValueChange(e.target.value)}
                />
              </div>
            </div>
            <StockManagement handleClose={handleClose} show={show} amount={amount} setAmount={setAmount}  medicines={medicines} current_medicine_index={current_medicine_index} setStockType={setStockType} setError={setError} pharmacyID={pharmacyID}  user={user} stockType={stockType} type={type}  />
            <div className="d-flex justify-content-center">
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th> SL </th> <th> Medicine Name </th>
                    <th> Generic Name </th> <th> Type </th>
                    <th> Manufacturer </th> <th> Sell Price </th>
                    <th> Purchase Price </th> <th onClick={()=>filterByToggle((togglePcs+1)%3)}> {(togglePcs===0 && "Amount(Pcs)")||(togglePcs===1 && "Amount(Boxes)")||(togglePcs===2 && "Amount(Strips)")} </th>
                    <th> Action </th>
                  </tr>
                </thead>
                <tbody>
                  
                  {filteredMedicines.map((medicine) => (
                    <tr
                      key={medicine._id}
                      onClick={() => editMedicine(medicine._id)}
                    >
                      <td> {medicine._id} </td>
                      <td> {medicine.MedicineName} </td>
                      <td> {medicine.GenericName} </td>
                      <td>
                        
                        {medicine.Type !== "Default"
                          ? types.find((obj) => obj._id === medicine.Type).Name
                          : "Undefined"}
                      </td>
                      <td> {medicine.Manufacturer} </td>
                      <td> {medicine.SellingPrice} </td>
                      <td> {medicine.PurchasePrice} </td>
                      <td>{(togglePcs===0 && (<span>{medicine.Amount.Pcs}</span>))||(togglePcs===1 && (<span>{medicine.Amount.Boxes}</span>))||(togglePcs===2 && (<span>{medicine.Amount.Strips}</span>))}  </td>
                      <td>
                        <Button
                          variant="secondary"
                          className="mx-0 plusButton"
                          onClick={() => handleShow("add",medicine._id)}
                        >
                          
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
                          
                          <i
                            className="bx bxs-minus-circle minusIcon"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
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
