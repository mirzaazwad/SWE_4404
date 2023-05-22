import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { Button, Card, Form } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useDispatch, useSelector } from "react-redux";
import { addItem, updateItem, updatePrescriptionImage } from "../../Contexts/cartAction.js";
import { useToken } from "../../Hooks/useToken";
import ErrorModal from "../partials/errorModal";
import Loader from "../partials/loader";

const MedicineDetails = () => {
  const user = useToken();
  const dispatch = useDispatch();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get("cid");
  const pharmacyManagerId = queryParams.get("pid");
  const medicineId = queryParams.get("mid");
  const cart = useSelector((state) => state.cartState) || [];
  const cartManager = localStorage.getItem("cartPharmacyManager") || "";
  const [medicine, setMedicine] = useState({});
  const [quantityPcs, setQuantityPcs] = useState(0);
  const [quantityStrips, setQuantityStrips] = useState(0);
  const [quantityBoxes, setQuantityBoxes] = useState(0);
  const [prescriptionImage, setPrescriptionImage] = useState();
  const [error, setError] = useState("");
  const [units, setUnits] = useState(1);
  const [price, setPrice] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const fetchMedicine = async (id, medicineId) => {
    try {
      const response = await axios.get(
        `/api/pharmacy/${pharmacyManagerId}/medicine/${medicineId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            idType: user.googleId ? "google" : "email",
          },
        }
      ).then((result)=>{
        console.log(result);
        return result.data;
      })
      setMedicine(response);
    } catch (error) {
      console.log(error);
    }
  };
  const updateMedicinePrescription = async (prescriptionURL) => {
    if(medicine.prescription === true)
    {const { Stock, ...medicineWithoutStock } = medicine;
      await dispatch(updatePrescriptionImage({
        ...medicineWithoutStock,
        id: id,
        medicineId: medicineId,
        quantityPcs: quantityPcs,
        quantityStrips: quantityStrips,
        quantityBoxes: quantityBoxes,
        price: price,
        prescriptionImage: prescriptionURL,
      }));
    }
  };

  useEffect(() => {
    fetchMedicine(pharmacyManagerId, medicineId);
    if (pharmacyManagerId !== cartManager && cartManager !== "") {
      setError(
        "Cart contains medicine from another pharmacy, clear cart before proceeding"
      );
    }
  }, [user]);
 

  useEffect(() => {
    const calculatePrice = async () => {
      console.log('medicine is: ',medicine);
      let pcsPrice = 0,
        stripsPrice = 0,
        boxesPrice = 0;
      if (medicine?.Stock && medicine.Stock.hasOwnProperty('Strips')) {
        pcsPrice =
          (Number(medicine.SellingPrice) * Number(quantityPcs)) /
          (Number(medicine.PcsPerStrip) * Number(medicine.StripsPerBox));
          console.log('pcs',pcsPrice);
          console.log('quantpc',quantityPcs);
          console.log('pcstrip',medicine.PcsPerStrip);
          console.log('stripbox',medicine.StripsPerBox);
          console.log('sp',medicine.SellingPrice);
        stripsPrice =
          (Number(medicine.SellingPrice) * Number(quantityStrips)) / Number(medicine.StripsPerBox);
        boxesPrice = Number(medicine.SellingPrice) * Number(quantityBoxes);
      } else {
        pcsPrice = (Number(medicine.SellingPrice) * Number(quantityPcs)) / Number(medicine.PcsPerBox);
        boxesPrice = Number(medicine.SellingPrice) * Number(quantityBoxes);
      }
      var totalPrice = pcsPrice + stripsPrice + boxesPrice;
      var truncatedPrice = Math.round(totalPrice);
      
      setPrice(truncatedPrice);
      if(medicine?.Stock)
      {
        setLoaded(true);
      }
    };

    if(medicine!==null && medicine!==undefined){
      calculatePrice();
    }
  }, [medicine, quantityPcs, quantityStrips, quantityBoxes]);

  const navigate = useNavigate();
  const goBack = () => {
    navigate(-1);
  };
  const handleIncreasePcs = () => {
    // update quantity state
    if (medicine.Stock.Pcs >= quantityPcs + 1) {
      setQuantityPcs(quantityPcs + 1);
    }
  };

  const handleDecreasePcs = () => {
    if (quantityPcs > 0) {
      setQuantityPcs(quantityPcs - 1); // update quantity state
    }
  };
  const handleIncreaseStrips = () => {
    if (medicine.Stock.Strips >= quantityStrips + 1) {
      setQuantityStrips(quantityStrips + 1); // update quantity state
    }
  };

  const handleDecreaseStrips = () => {
    if (quantityStrips > 0) {
      setQuantityStrips(quantityStrips - 1); // update quantity state
    }
  };
  const handleIncreaseBoxes = () => {
    if (medicine.Stock.Boxes >= quantityBoxes + 1) {
      setQuantityBoxes(quantityBoxes + 1); // update quantity state
    }
  };

  const handleDecreaseBoxes = () => {
    if (quantityBoxes > 0) {
      setQuantityBoxes(quantityBoxes - 1); // update quantity state
    }
  };
  const handlePcs = () => {
    if (medicine.Stock.Strips != null) {
      setUnits(1 / (medicine.StripsPerBox * medicine.PcsPerStrip));
    } else {
      setUnits(1 / medicine.PcsPerBox);
    }
  };
  const handleStrips = () => {
    if (medicine.Stock.Strips != null) {
      setUnits(1 / medicine.StripsPerBox);
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
  
    localStorage.setItem("cartPharmacyManager", pharmacyManagerId);
  
    if (found) {
      try {
          await updateCartItem("");
        } catch (error) {
          console.log("Error uploading image:", error);
        }
      }
     else {
     try {
          await addItemToCart("");
        } catch (error) {
          console.log("Error uploading image:", error);
        }
      } 

      if (prescriptionImage) {
        console.log(prescriptionImage);
        const formData = new FormData();
        formData.append("file", prescriptionImage);
        formData.append("upload_preset", "med_guard");
    
        try {
          const dataRes = await axios.post(
            "https://api.cloudinary.com/v1_1/dzerdaaku/image/upload",
            formData
          );
    
          const prescriptionURL = dataRes.data.url;
          updateMedicinePrescription(prescriptionURL);
        }catch{
          console.log("Error uploading image:", error);
        }
      }
      
    };
  
  const updateCartItem = async (prescriptionURL) => {
      const { Stock, ...medicineWithoutStock } = medicine;
      await dispatch(
        updateItem({
          ...medicineWithoutStock,
          id: id,
          medicineId: medicineId,
          quantityPcs: quantityPcs,
          quantityStrips: quantityStrips,
          quantityBoxes: quantityBoxes,
          price: price,
          prescriptionImage: prescriptionURL,
        })
      );
  };

  
  
  const addItemToCart = async (prescriptionURL) => {
      const { Stock, ...medicineWithoutStock } = medicine;
      await dispatch(
        addItem({
          ...medicineWithoutStock,
          id: id,
          medicineId: medicineId,
          quantityPcs: quantityPcs,
          quantityStrips: quantityStrips,
          quantityBoxes: quantityBoxes,
          price: price,
          prescriptionImage: prescriptionURL,
        })
      );
  };
  
  if (!loaded) {
    return <Loader />;
  }
  return (
    <div>
      <div>
        <NavbarCustomer id={id} />
      </div>
      <div>
        <Card className="medicine-details-card mb-4 mx-auto">
          <Card.Header className="medicine-details-cardHeader">
            {medicine.MedicineName}
          </Card.Header>
          <div className="row">
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Card className="ms-2" style={{ border: "none" }}>
                <Card.Img
                  variant="top"
                  src={medicine.imageURL}
                  className="medicine-details-image"
                />
              </Card>
            </div>
            <div className="col-sm-12 col-md-12 col-lg-6">
              <Card.Body>
                <Card.Title></Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  <ErrorModal error={error} setError={setError} />
                  <p style={{ fontSize: "16px" }}>
                    Generic Name: {medicine.GenericName}
                  </p>
                  <hr />
                  <p style={{ fontSize: "16px" }}>
                    Type: {medicine.medicineType}{" "}
                  </p>
                  <hr />
                  <p style={{ fontSize: "16px" }}>
                    Category: {medicine.medicineCategory}{" "}
                  </p>
                  <hr />
                </Card.Subtitle>
                <Card.Text>
                  <p style={{ color: "#EB006F", fontSize: "16px" }}>
                    Manufacturer: {medicine.Manufacturer}
                  </p>
                  <hr />
                  <p style={{ color: "red", fontSize: "20px" }}>
                    Price: ৳{Math.round(medicine.SellingPrice * units)}
                  </p>
                  <hr />
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
                              <Button
                                className="btn btn-decrease h-100 me-2"
                                onClick={handleDecreasePcs}
                              >
                                <i className="bx bxs-minus-circle"></i>
                              </Button>
                              <p className="m-0 p-2">{quantityPcs}</p>
                              <Button
                                className="btn btn-increase h-100 ms-2"
                                onClick={handleIncreasePcs}
                              >
                                <i className="bx bxs-plus-circle"></i>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                      <div>
                        {medicine.Stock.Strips !== null &&
                          medicine.Type.hasStrips && (
                            <div className="d-flex justify-content-between align-items-center mb-3">
                              <Form.Check
                                type="radio"
                                label="Strips"
                                name="formHorizontalRadios"
                                id="formHorizontalRadios2"
                                onClick={handleStrips}
                              />
                              <div className="addRemove-buttons d-flex justify-content-between align-items-center">
                                <Button
                                  className="btn btn-decrease h-100 me-2"
                                  onClick={handleDecreaseStrips}
                                >
                                  <i className="bx bxs-minus-circle"></i>
                                </Button>
                                <p className="m-0 p-2">{quantityStrips}</p>
                                <Button
                                  className="btn btn-increase h-100 ms-2"
                                  onClick={handleIncreaseStrips}
                                >
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
                              <Button
                                className="btn btn-decrease h-100 me-2"
                                onClick={handleDecreaseBoxes}
                              >
                                <i className="bx bxs-minus-circle"></i>
                              </Button>
                              <p className="m-0 p-2">{quantityBoxes}</p>
                              <Button
                                className="btn btn-increase h-100 ms-2"
                                onClick={handleIncreaseBoxes}
                              >
                                <i className="bx bxs-plus-circle"></i>
                              </Button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </Card.Text>
                {medicine.prescription === true && (
                  <div>
                    <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label style={{ color: "red" }}>
                        Prescription required for this medicine
                      </Form.Label>
                      <Form.Control
                        type="file"
                        name="file"
                        accept="image/*"
                        id="imageFilePrescription"
                        onChange={(e) =>
                          setPrescriptionImage(e.target.files[0])
                        }
                      />
                    </Form.Group>
                  </div>
                )}

                <div className="d-flex justify-content-around w-100">
                  <Button className="btn btn-buyMore me-4" onClick={goBack}>
                    <i className="bx bx-search-alt bx-sm"></i>Buy More
                  </Button>
                  <Button
                    className="btn btn-addCart ms-3"
                    disabled={
                      (pharmacyManagerId !== cartManager &&
                        cartManager !== "") ||
                      (!prescriptionImage && medicine.prescription===true ) ||
                      quantityPcs + quantityStrips + quantityBoxes === 0
                    }
                    onClick={handleAddToCart}
                  >
                    <i className="bx bx-cart bx-sm"></i>Add to cart
                  </Button>
                </div>
              </Card.Body>
            </div>
          </div>
        </Card>
      </div>
      <div className="mx-5">
        <h1 style={{ color: "#EB006F" }}>Description:</h1>
        <hr />
        <p> {medicine.Description}</p>
      </div>
    </div>
  );
};

export default MedicineDetails;