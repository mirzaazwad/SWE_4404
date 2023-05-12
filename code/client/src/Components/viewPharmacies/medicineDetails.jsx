import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate, useLocation} from "react-router-dom";
import { Button, Card, Form, Modal } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, updateItem } from '../../Contexts/cartAction.js';
import { useToken } from "../../Hooks/useToken";
import { cartPharmacyManager } from "../../Contexts/cartManager";

const MedicineDetails = () => {
  const user=useToken();
  const dispatch = useDispatch();
  const location=useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('cid');
  const pharmacyManagerId = queryParams.get('pid');
  const medicineId=queryParams.get('mid');
  const cart = useSelector(state => state.cartState) || [];
  const cartManager=localStorage.getItem('cartPharmacyManager') || "";
  const [medicine, setMedicine] = useState({});
  const [quantityPcs, setQuantityPcs] = useState(0);
  const [quantityStrips, setQuantityStrips] = useState(0);
  const [quantityBoxes, setQuantityBoxes] = useState(0);
  const [error,setError]=useState("");
  const [units, setUnits] = useState(1);
  const [price, setPrice] = useState(0);
  const fetchMedicine = async (id, medicineId) => {
    try {
      const response = await axios.get(
        `/api/pharmacy/${pharmacyManagerId}/medicine/${medicineId}`
        ,{
          headers:{'Authorization': `Bearer ${user.token}`}
        });
      setMedicine(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedicine(pharmacyManagerId, medicineId);
    if(pharmacyManagerId!==cartManager && cartManager!==""){
      setError("Cart contains medicine from another pharmacy, clear cart before proceeding");
    }
  }, []);
  
  useEffect(() => {
    const calculatePrice = async () => {
      let pcsPrice=0, stripsPrice=0, boxesPrice=0;
      if(medicine.Stock.Strips && medicine.Type.hasStrips){
        stripsPrice=quantityStrips*(medicine.SellingPrice/medicine.StripsPerBox);
      }
      if(medicine.Stock.Boxes){
        boxesPrice=medicine.SellingPrice*quantityBoxes;
      }
      if(medicine.Stock.Pcs){
        if(medicine.Type.hasStrips){
          pcsPrice=quantityPcs*(medicine.SellingPrice/(medicine.PcsPerStrip*medicine.StripsPerBox));
        }
        else{
          pcsPrice=quantityPcs*(medicine.SellingPrice/(medicine.PcsPerBox));
        }
      }
      setPrice(pcsPrice+stripsPrice+boxesPrice);
    };
  
    calculatePrice();
  }, [medicine, quantityPcs, quantityStrips, quantityBoxes]);
  
  const navigate = useNavigate();
	const goBack = () => {
		navigate(-1);
  };
  const handleIncreasePcs = () => {
    // update quantity state
    if(medicine.Stock.Pcs>=quantityPcs+1)
    {
      setQuantityPcs(quantityPcs + 1); 
    }
  };

  const handleDecreasePcs = () => {
    if (quantityPcs > 0) {
      setQuantityPcs(quantityPcs - 1); // update quantity state
    }
  };
  const handleIncreaseStrips = () => {
    if(medicine.Stock.Strips>=quantityStrips+1)
    {

      setQuantityStrips(quantityStrips + 1); // update quantity state
      
    }
  };

  const handleDecreaseStrips = () => {
    if (quantityStrips > 0) {
      setQuantityStrips(quantityStrips - 1); // update quantity state
    }
  };
  const handleIncreaseBoxes = () => {
    if(medicine.Stock.Boxes>=quantityBoxes+1)
    {
        
        setQuantityBoxes(quantityBoxes + 1); // update quantity state
    }
  };

  const handleDecreaseBoxes = () => {
    if (quantityBoxes > 0) {
      setQuantityBoxes(quantityBoxes - 1); // update quantity state
    }
  };
  const handlePcs = () => {
    if(medicine.Type.hasStrips){
      setUnits(medicine.PcsPerStrip*medicine.StripsPerBox);
    }
    else{
      setUnits(medicine.PcsPerBox);
    }
  };
  const handleStrips = () => {
    if(medicine.Stock.Strips != null)
    {
      setUnits(medicine.StripsPerBox);
    }
  };
  const handleBoxes = () => {
    setUnits(1);
  };

  
  const handleAddToCart = async () => {
    let found = false;
    for (const item of cart) {
      if (item.medicineId === medicineId && item.id === id) {
        found = true;
        break;
      }
    }
    dispatch(cartPharmacyManager(pharmacyManagerId));
    if (found) {
      const { Stock, ...medicineWithoutStock } = medicine;
      await dispatch(updateItem({
        ...medicineWithoutStock,
        id: id,
        medicineId: medicineId,
        quantityPcs: quantityPcs,
        quantityStrips: quantityStrips,
        quantityBoxes: quantityBoxes,
        price: price
      }));
    } else {
      const { Stock, ...medicineWithoutStock } = medicine;
      await dispatch(addItem({
        ...medicineWithoutStock,
        id: id,
        medicineId: medicineId,
        quantityPcs: quantityPcs,
        quantityStrips: quantityStrips,
        quantityBoxes: quantityBoxes,
        price: price
      }));
    }
    // await console.log(cart);
  };
  
  return (
    <div>
      <NavbarCustomer id={id} />
      <div className="d-flex justify-content-center">
        <Card className="medicine-details-card w-50 mb-4">
          <Card.Header className="medicine-details-cardHeader">
            {medicine.MedicineName}
          </Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              
                <Modal show={error!==""} onHide={()=>setError("")} style={{marginTop:"10vh",marginLeft:"50vh",width:"100vh",height:"100vh"}}>
                  <Modal.Header style={{backgroundColor:"#103686",color:"white"}} closeButton>Error</Modal.Header>
                  <Modal.Body>
                  <div className="errorMessage" style={{color:"red"}}>
                    {error}
                  </div>
                  </Modal.Body>
                </Modal>
              <p style={{ fontSize: "20px" }}>Generic Name: {medicine.GenericName}</p><hr/>
              <p style={{ fontSize: "20px" }}>Type: {medicine.medicineType} </p><hr/>
              <p style={{ fontSize: "20px" }}>Category: {medicine.medicineCategory} </p><hr/>
            </Card.Subtitle>
            <Card.Text>
              <p style={{ color: "#EB006F", fontSize: "20px" }}>
                Manufacturer: {medicine.Manufacturer}
              </p><hr/>
              <p style={{ color: "red" ,fontSize: "25px" }}>Price: ৳{medicine.SellingPrice/units}</p><hr/>
              <p>Stock:</p>
              {medicine.Stock && (
                <div>
                  <div>
                    {medicine.Stock.Pcs != null && (
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check
                          type="radio"
                          label="Pieces"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios1"
                          onClick={handlePcs}
                        />
                        <div className="addRemove-buttons d-flex justify-content-between align-items-center">
                        <Button className="btn btn-decrease h-100 me-2" onClick={handleDecreasePcs}>
                            <i className="bx bxs-minus-circle"></i>
                          </Button>
                          <p className="m-0 p-2">{quantityPcs}</p>
                          <Button className="btn btn-increase h-100 ms-2" onClick={handleIncreasePcs}>
                            <i className="bx bxs-plus-circle"></i>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {medicine.Stock.Strips!==null && medicine.Type.hasStrips && (
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check
                          type="radio"
                          label="Strips"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                          onClick={handleStrips}
                        />
                        <div className="addRemove-buttons d-flex justify-content-between align-items-center">
                          <Button className="btn btn-decrease h-100 me-2" onClick={handleDecreaseStrips}>
                            <i className="bx bxs-minus-circle"></i>
                          </Button>
                          <p className="m-0 p-2">{quantityStrips}</p>
                          <Button className="btn btn-increase h-100 ms-2" onClick={handleIncreaseStrips}>
                            <i className="bx bxs-plus-circle"></i>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {medicine.Stock.Boxes != null && (
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check
                          type="radio"
                          label="Boxes"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                          onClick={handleBoxes}
                          defaultChecked={true}
                        />
                        <div className="addRemove-buttons d-flex justify-content-between align-items-center ">
                          <Button className="btn btn-decrease h-100 me-2" onClick={handleDecreaseBoxes}>
                            <i className="bx bxs-minus-circle"></i>
                          </Button>
                          <p className="m-0 p-2">{quantityBoxes}</p>
                          <Button className="btn btn-increase h-100 ms-2" onClick={handleIncreaseBoxes}>
                            <i className="bx bxs-plus-circle"></i>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card.Text>
            <div className="d-flex justify-content-around w-100">
              <Button className="btn btn-buyMore me-4" onClick={goBack}>
                <i className="bx bx-search-alt bx-sm"></i>Buy More
              </Button>
              <Button className="btn btn-addCart ms-3" disabled={(pharmacyManagerId!==cartManager && cartManager!=="") || quantityPcs+quantityStrips+quantityBoxes===0} onClick={handleAddToCart}>
                <i className="bx bx-cart bx-sm"></i>Add to cart
              </Button>
            </div><hr/>
          </Card.Body>
        </Card>
      </div>
      <div className="mx-5">
      <h1 style={{color: '#EB006F'}}>Description:</h1><hr/>
            <p> {medicine.Description}</p>
      </div>
            
    </div>
  );
};

export default MedicineDetails;
