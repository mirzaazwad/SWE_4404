import React from "react";
import { useEffect, useState } from "react";
import {Button,Form,Table} from "react-bootstrap";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { useSocket } from "../../Hooks/useSocket";
import AddExistingMedicine from "./addExistingMedicine";
import { useToken } from "../../Hooks/useToken";
import StockManagement from "./stockControl";
import Loader from "../partials/loader";
import pharmacyInventory from "../../Library/Pharmacy/pharmacy";

const Inventory = () => {
  const user=useToken();
  useSocket(user._id,[]);
  const [inventory,setInventory]=useState(null);
  const [current_medicine_index,setCurrentMedicineIndex]=useState();
  const [medicines, setMedicines] = useState([]);
  const [stockType, setStockType] = useState("");
  const [amount, setAmount] = useState(0);
  const [error,setError]=useState(null);
  const [showMedicines,setShowMedicines]=useState(false);
  const [loading,setLoading]=useState(true);
  const [togglePcs,setTogglePcs]=useState(0);
  const [filterChangeValue,setFilterChangeValue]=useState("");

  useEffect(() => {
    const retrieveInventory=async()=>{
      const pharmacy=new pharmacyInventory(user._id,user.token,user.googleId);
      await pharmacy.retrieveInformation();
      console.log(pharmacy.Inventory);
      setMedicines(pharmacy.Inventory);
      setInventory(pharmacy);
      setLoading(false);
    }
    retrieveInventory();
  }, [user]);

  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (type,id) => {
    console.log("index:",id);
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
      setFilteredMedicines(filteredMedicines.filter((medicines)=>medicines.Stock.hasOwnProperty('Strips')));
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

  const handleClosing=(data)=>{
    setShowMedicines(data);
  }

  

  if (!loading) {
    return (
      <div>
        <div>
          <NavbarPharmacy user={user}/>
        </div>
        <section className="inventory-section">
          <div className="d-flex w-75 m-auto  flex-column">
            <div className="d-flex justify-content-between mb-2">
                <Button className="btn btn-add" variant="primary" onClick={()=>setShowMedicines(true)}>
                  Add new medicine <i className="bx bx-plus-circle bx-sm"></i>
                </Button>
              <AddExistingMedicine user={{inventory:inventory,setInventory:setInventory}} show={{show:showMedicines,onClosing:handleClosing}}/>
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
            <StockManagement show={{show:show,handleClose:handleClose}} amount={{amount:amount,setAmount:setAmount}}  medicines={{medicineArray:medicines,current_ix:current_medicine_index}} setError={setError}  inventory={{inventory:inventory,setInventory:setInventory}} stock={{stockType:stockType,setStockType:setStockType,option:type}}/>
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
                  
                  {filteredMedicines.map((medicine,index) => (
                    <tr
                      key={medicine._id}
                    >
                      <td> {index+1} </td>
                      <td> {medicine.MedicineName} </td>
                      <td> {medicine.GenericName} </td>
                      <td>
                        {medicine.Type.Name}
                      </td>
                      <td> {medicine.Manufacturer} </td>
                      <td> {medicine.SellingPrice} </td>
                      <td> {medicine.PurchasePrice} </td>
                      <td>{(togglePcs===0 && (<span>{medicine.Stock.Pcs}</span>))||(togglePcs===1 && (<span>{medicine.Stock.Boxes}</span>))||(togglePcs===2 && (<span>{medicine.Stock.Strips}</span>))}  </td>
                      <td>
                        <Button
                          variant="secondary"
                          className="mx-0 plusButton"
                          onClick={() => handleShow("add",index)}
                        >
                          
                          <i
                            className="bx bxs-plus-circle plusIcon"
                            style={{ fontSize: "24px" }}
                          ></i>
                        </Button>
                        <Button
                          variant="danger"
                          className="mx-0 minusButton"
                          onClick={() => handleShow("remove",index)}
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
      <Loader/>
    )
  }
};
export default Inventory;
