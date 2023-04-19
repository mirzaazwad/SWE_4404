import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";

const MedicineDetails = () => {
  const [medicine, setMedicine] = useState({});
  const [quantityPcs, setQuantityPcs] = useState(0);
  const [quantityStrips, setQuantityStrips] = useState(0);
  const [quantityBoxes, setQuantityBoxes] = useState(0);
  const { id, medicineId } = useParams();

  const fetchMedicine = async (id, medicineId) => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/pharmacy/${id}/medicine/${medicineId}`
      );
      console.log(response.data);
      setMedicine(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMedicine(id, medicineId);
  }, []);
  const handleAddToCartPcs = () => {
    setQuantityPcs(quantityPcs + 1); // update quantity state
  };

  const handleRemoveFromCartPcs = () => {
    if (quantityPcs > 0) {
      setQuantityPcs(quantityPcs - 1); // update quantity state
    }
  };
  const handleAddToCartStrips = () => {
    setQuantityStrips(quantityStrips + 1); // update quantity state
  };

  const handleRemoveFromCartStrips = () => {
    if (quantityStrips > 0) {
      setQuantityStrips(quantityStrips - 1); // update quantity state
    }
  };
  const handleAddToCartBoxes = () => {
    setQuantityBoxes(quantityBoxes + 1); // update quantity state
  };

  const handleRemoveFromCartBoxes = () => {
    if (quantityBoxes > 0) {
      setQuantityBoxes(quantityBoxes - 1); // update quantity state
    }
  };
  return (
    <div>
      <NavbarCustomer id={id} />
      <div className="d-flex justify-content-center">
        <Card className="medicine-details-card w-50 ">
          <Card.Header className="medicine-details-cardHeader">
            {medicine.MedicineName}
          </Card.Header>
          <Card.Body>
            <Card.Title></Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              <p style={{ fontSize: "20px" }}>{medicine.GenericName}</p>
              <p style={{ fontSize: "20px" }}>{medicine.Description} </p>
              {/* ekhane type name dibo */}
            </Card.Subtitle>
            <Card.Text>
              <p style={{ color: "#EB006F", fontSize: "20px" }}>
                Manufacturer: {medicine.Manufacturer}
              </p>
              <p style={{ color: "red" ,fontSize: "25px" }}>Price: ৳{medicine.SellingPrice}</p>
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
                        />
                        <div className="d-flex justify-content-between align-items-center">
                        <Button className="btn btn-removeFromCart h-100 me-2" onClick={handleRemoveFromCartPcs}>
                            <i className="bx bxs-minus-circle"></i>
                          </Button>
                          <p className="m-3">{quantityPcs}</p>
                          <Button className="btn btn-addToCart h-100 ms-2" onClick={handleAddToCartPcs}>
                            <i className="bx bxs-plus-circle"></i>
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>
                  <div>
                    {medicine.Stock.Strips != null && (
                      <div className="d-flex justify-content-between align-items-center mb-3">
                        <Form.Check
                          type="radio"
                          label="Strips"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                        />
                        <div className="d-flex justify-content-between align-items-center">
                          <Button className="btn btn-removeFromCart h-100 me-2" onClick={handleRemoveFromCartStrips}>
                            <i className="bx bxs-minus-circle"></i>
                          </Button>
                          <p className="m-3">{quantityStrips}</p>
                          <Button className="btn btn-addToCart h-100 ms-2" onClick={handleAddToCartStrips}>
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
                        />
                        <div className="d-flex justify-content-between align-items-center">
                        <Button className="btn btn-removeFromCart h-100 me-2" onClick={handleRemoveFromCartBoxes}>
                            <i className="bx bxs-minus-circle"></i>
                          </Button>
                          <p className="m-3">{quantityBoxes}</p>
                          <Button className="btn btn-addToCart h-100 ms-2" onClick={handleAddToCartBoxes}>
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
              <Button className="btn btn-buyMore me-4">
                <i className="bx bx-search-alt bx-sm"></i>Buy More
              </Button>
              <Button className="btn btn-addCart ms-3">
                <i className="bx bx-cart bx-sm"></i>Add to cart
              </Button>
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default MedicineDetails;
