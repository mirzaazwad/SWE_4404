import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useDispatch, useSelector } from 'react-redux';
import { addItem, removeItem, updateItem } from '../../Contexts/cartAction.js';
import { useToken } from "../../Hooks/useToken";

const MedicineDetails = () => {
  const user=useToken();
  const dispatch = useDispatch();
  const cart = useSelector(state => state.cartState) || [];
  const [medicine, setMedicine] = useState({});
  const [quantityPcs, setQuantityPcs] = useState(0);
  const [quantityStrips, setQuantityStrips] = useState(0);
  const [quantityBoxes, setQuantityBoxes] = useState(0);
  const { id, medicineId } = useParams();
  const [units, setUnits] = useState(1);
  const [price, setPrice] = useState(0);
  const fetchMedicine = async (id, medicineId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/pharmacy/${id}/medicine/${medicineId}`
        ,{
          headers:{'Authorization': `Bearer ${user.token}`}
        });
      setMedicine(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedicine(id, medicineId);
  }, []);
  
  useEffect(() => {
    const calculatePrice = async () => {
      console.log(medicine);
      let pcsPrice=0, stripsPrice=0, boxesPrice=0;
      if(medicine.Stock.Strips != null)
      {
        
          pcsPrice = (medicine.SellingPrice*quantityPcs)/(medicine.PcsPerStrip*medicine.StripsPerBox);
          stripsPrice = (medicine.SellingPrice*quantityStrips)/(medicine.StripsPerBox);
          boxesPrice = medicine.SellingPrice*quantityBoxes
        
      }
      else
      {
     
          pcsPrice = (medicine.SellingPrice*quantityPcs)/(medicine.PcsPerBox);
          boxesPrice = medicine.SellingPrice*quantityBoxes;
        
      }
      console.log(pcsPrice);
      console.log(boxesPrice);
      console.log(stripsPrice);
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
    if(medicine.Stock.Strips != null)
    {
      setUnits(1/(medicine.StripsPerBox*medicine.PcsPerStrip));
    }
    else
    {
      setUnits(1/medicine.PcsPerBox);
    }
    
  };
  const handleStrips = () => {
    if(medicine.Stock.Strips != null)
    {
      setUnits(1/medicine.StripsPerBox);
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
      <div>
        <NavbarCustomer id={id} />
      </div>  
      <div>
            <Card className="medicine-details-card w-75 mb-4 mx-auto">
          <Card.Header className="medicine-details-cardHeader">
            {medicine.MedicineName}
          </Card.Header>
          <div className="row">
          <div className="col-md-6">
          <Card className="ms-2" style={{border: 'none'}}>
                <Card.Img variant="top" src={medicine.imageURL} className="medicine-details-image"/>
              </Card>
            </div>
            <div className="col-md-6">
          
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
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
                          defaultChecked={true}
                          onClick={handleBoxes}
                         
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
              <Button className="btn btn-addCart ms-3" disabled={quantityPcs+quantityStrips+quantityBoxes===0} onClick={handleAddToCart}>
                <i className="bx bx-cart bx-sm"></i>Add to cart
              </Button>
            </div>
          </Card.Body>
            </div>
          </div>
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
