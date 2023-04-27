import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { InputGroup, Form } from "react-bootstrap";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { useEffect, useState } from "react";
import DOMPurify from "dompurify";
import axios from "axios";
import {useNavigate, useParams } from "react-router-dom";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import { useSelector } from "react-redux";
import { useSocket } from "../../Hooks/useSocket";

const AddMedicine = () => {
  const user = useSelector((state)=>state.userState.user);
  const id = useParams();
  const _id = id.id;
  const socket=useSocket(_id,[]);
  const navigate=useNavigate();
  const [sellerId, setSellerId] = useState();
  const [categories, setCategories] = useState(null);
  const [types, setTypes] = useState(null);
  const [medicineName, setMedicineName] = useState("");
  const [genericName, setGenericName] = useState("");
  const [description, setDescription] = useState("");
  const [stripsPerBox, setStripsPerBox] = useState();
  const [sellingPrice, setSellingPrice] = useState();
  const [pcsPerStrip, setPcsPerStrip] = useState();
  const [pcsPerBox, setPcsPerBox] = useState();
  const [manufacturer, setManufacturer] = useState("");
  const [purchasePrice, setPurchasePrice] = useState();
  const [medicineType, setMedicineType] = useState("Default");
  const [medicineCateogry, setMedicineCategory] = useState("Default");
  const [error, setError] = useState("");
  const [Strips, setHasStrips] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showType, setShowType] = useState(false);
  const [typename,setTypeName]=useState("");
  const [typeDescription,setTypeDescription]=useState("");
  const [typeStrip,setTypeStrip]=useState(false);
  const [categoryName,setCategoryName]=useState("");
  const [categoryDescription,setCategoryDescription]=useState("");
  const handleCloseCategory = () => setShowCategory(false);
  const handleShowCategory = (type, id) => {
    setShowCategory(true);
  };
  const handleCloseType = () => setShowType(false);
  const handleShowType = (type, id) => {
    setShowType(true);
  };

  useEffect(() => {
    axios
      .get("/api/profile/user/getUserSellerId/" + _id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((response) => {
        setSellerId(response.data._id);
      })
      .catch((err) => console.log(err));
    axios
      .get("/api/profile/addMedicine/findCateogry", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setCategories(result.data);
      });
    axios
      .get("/api/profile/addMedicine/findType", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setTypes(result.data);
      });
  }, [_id,user.token]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (medicineType === "default" || medicineType === "Default") {
      setError("Medicine Type is required");
      return;
    }
    if (medicineCateogry === "default" || medicineCateogry === "Default") {
      setError("Medicine Category is required");
      return;
    }
    if (Strips === true) {
      axios
        .patch("/api/profile/addMedicine/addNewMedicine/" + sellerId, {
          MedicineName: medicineName,
          GenericName: genericName,
          TypeID: medicineType,
          CateogryID: medicineCateogry,
          StripsPerBox: stripsPerBox,
          PcsPerStrip: pcsPerStrip,
          Manufacturer: manufacturer,
          SellingPrice: sellingPrice,
          PurchasePrice: purchasePrice,
          Description: description,
        },{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          return navigate("/inventoryManagementSystem/inventory/" + _id);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .patch("/api/profile/addMedicine/addNewMedicine/" + sellerId, {
          MedicineName: medicineName,
          GenericName: genericName,
          TypeID: medicineType,
          CateogryID: medicineCateogry,
          PcsPerBox: pcsPerBox,
          Manufacturer: manufacturer,
          SellingPrice: sellingPrice,
          PurchasePrice: purchasePrice,
          Description: description,
        },{
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        })
        .then((result) => {
          return navigate("/inventoryManagementSystem/inventory/" + _id);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleMedicineType = (e) => {
    setMedicineType(e);
    setHasStrips(false);
    types.forEach((elem) => {
      if (elem.hasStrips && elem._id === e) {
        setHasStrips(true);
      }
    });
  };

  const handleType = (e) =>{
    handleCloseType();
    e.preventDefault();
    axios.post('/api/profile/addMedicine/addType',{
      name:typename,
      description:typeDescription,
      strips:typeStrip
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then(result=>console.log(result));
    window.location.reload();
  }

  const handleCategory = (e) =>{
    handleCloseCategory();
    e.preventDefault();
    axios.post('/api/profile/addMedicine/addCategory',{
      name:categoryName,
      description:categoryDescription
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((result)=>{
      console.log(result)
    });
    window.location.reload();
  }

  if (categories !== null && types !== null) {
    return (
      <div>
        <NavbarPharmacy id={_id} user={user}/>
        <section className="d-flex justify-content-center">
          <Card className="addMedicineCard">
            <Card.Header
              className="addMedicineCardHeader"
              style={{ fontSize: "20px" }}
            >
              <b>Add Medicine</b>
            </Card.Header>
            <Card.Title className="addMedicineCardTitle">
              New Medicine Information:
              <Button
                className="btn float-end"
                variant="primary"
                size="sm"
                style={{ height: "100%", marginRight: "0.8%" }}
                onClick={() => handleShowCategory(1, "add")}
              >
                Add Category
              </Button>
              <Button
                className="btn float-end"
                variant="primary"
                size="sm"
                style={{ height: "100%", marginRight: "0.8%" }}
                onClick={() => handleShowType(1, "add")}
              >
                Add Medicine Type
              </Button>
            </Card.Title>
            <Card.Body>
              <div className="errorMessage" style={{ color: "red" }}>
                {error}
              </div>
              <Form onSubmit={handleSubmit}>
                <div className="addMedicineSide d-flex justify-content-between">
                  <div className="w-100 me-2">
                    <InputGroup className="mb-1">
                      <InputGroup.Text
                        className="required-field"
                        id="inputGroup-sizing-default"
                      >
                        Medicine Name
                      </InputGroup.Text>
                      <Form.Control
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Enter medicine name"
                        value={medicineName}
                        onChange={(e) =>
                          setMedicineName(DOMPurify.sanitize(e.target.value))
                        }
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="addMedicineSide w-100 pl-2">
                    <InputGroup className="mb-1">
                      <InputGroup.Text
                        className="required-field"
                        id="inputGroup-sizing-default"
                      >
                        Generic Name
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Enter generic name of medicine"
                        value={genericName}
                        onChange={(e) =>
                          setGenericName(DOMPurify.sanitize(e.target.value))
                        }
                        required
                      />
                    </InputGroup>
                  </div>
                </div>

                <br />
                <div className="addMedicineSide d-flex justify-content-between">
                  <div className="w-100 me-2">
                    <InputGroup className="mb-1">
                      <InputGroup.Text
                        className="required-field"
                        id="inputGroup-sizing-default"
                      >
                        Medicine Type
                      </InputGroup.Text>
                      <Form.Select
                        aria-label="Select an option"
                        placeholder="Select an option"
                        onChange={(e) => handleMedicineType(e.target.value)}
                      >
                        <option value="default">Select an option</option>
                        {types.length !== 0 &&
                          types.map((medicines) => (
                            <option value={medicines._id}>
                              {medicines.Name}
                            </option>
                          ))}
                      </Form.Select>
                    </InputGroup>
                  </div>
                  <div className="addMedicineSide w-100 pl-2">
                    <InputGroup className="mb-1">
                      <InputGroup.Text id="inputGroup-sizing-default">
                        Category
                      </InputGroup.Text>
                      <Form.Select
                        aria-label="Select an option"
                        placeholder="Select an option"
                        onChange={(e) => setMedicineCategory(e.target.value)}
                      >
                        <option value="default">Select an option</option>
                        {categories.length !== 0 &&
                          categories.map((category) => (
                            <option value={category._id}>
                              {category.cateogry}
                            </option>
                          ))}
                      </Form.Select>
                    </InputGroup>
                  </div>
                </div>

                <br />
                <div className="addMedicineSide d-flex justify-content-between">
                  {Strips && (
                    <div className="w-100 me-2">
                      <InputGroup className="mb-1">
                        <InputGroup.Text
                          className="required-field"
                          id="inputGroup-sizing-default"
                        >
                          Strips per box
                        </InputGroup.Text>
                        <Form.Control
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="Enter amount"
                          type="number"
                          value={stripsPerBox}
                          onChange={(e) =>
                            setStripsPerBox(DOMPurify.sanitize(e.target.value))
                          }
                          required
                        />
                      </InputGroup>
                    </div>
                  )}
                  <div className="addMedicineSide w-100 pl-2">
                    <InputGroup className="mb-1">
                      <InputGroup.Text
                        className="required-field"
                        id="inputGroup-sizing-default"
                      >
                        Manufacturer
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Enter manufacturer name"
                        value={manufacturer}
                        onChange={(e) =>
                          setManufacturer(DOMPurify.sanitize(e.target.value))
                        }
                        required
                      />
                    </InputGroup>
                  </div>
                </div>
                <br />
                <div className="addMedicineSide d-flex justify-content-between  mb-2">
                  <div className="w-100 me-2">
                    <InputGroup className="mb-1">
                      <InputGroup.Text
                        className="required-field"
                        id="inputGroup-sizing-default"
                      >
                        Box Purchase Price
                      </InputGroup.Text>
                      <Form.Control
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Enter amount"
                        type="number"
                        value={purchasePrice}
                        onChange={(e) =>
                          setPurchasePrice(DOMPurify.sanitize(e.target.value))
                        }
                        required
                      />
                    </InputGroup>
                  </div>
                  <div className="addMedicineSide w-100 pl-2">
                    <InputGroup className="mb-1">
                      <InputGroup.Text
                        className="required-field"
                        id="inputGroup-sizing-default"
                      >
                        Box Selling Price
                      </InputGroup.Text>
                      <Form.Control
                        aria-label="Default"
                        aria-describedby="inputGroup-sizing-default"
                        placeholder="Enter number"
                        type="number"
                        value={sellingPrice}
                        onChange={(e) =>
                          setSellingPrice(DOMPurify.sanitize(e.target.value))
                        }
                        required
                      />
                    </InputGroup>
                  </div>
                </div>
                <br />
                {Strips && (
                  <InputGroup className="mb-4">
                    <InputGroup.Text
                      className="required-field"
                      id="inputGroup-sizing-default"
                    >
                      Pieces per Strip
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter number"
                      type="number"
                      value={pcsPerStrip}
                      onChange={(e) =>
                        setPcsPerStrip(DOMPurify.sanitize(e.target.value))
                      }
                      required
                    />
                  </InputGroup>
                )}
                {!Strips && (
                  <InputGroup className="mb-4">
                    <InputGroup.Text
                      className="required-field"
                      id="inputGroup-sizing-default"
                    >
                      Pieces per Box
                    </InputGroup.Text>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter number"
                      type="number"
                      value={pcsPerBox}
                      onChange={(e) =>
                        setPcsPerBox(DOMPurify.sanitize(e.target.value))
                      }
                      required
                    />
                  </InputGroup>
                )}
                <InputGroup className="mb-4">
                  <InputGroup.Text id="inputGroup-sizing-default">
                    Description
                  </InputGroup.Text>
                  <Form.Control
                    as="textarea"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder="Add a description of the medicine, diagnosis, treatment, prevention of disease and side effects."
                    value={description}
                    onChange={(e) =>
                      setDescription(DOMPurify.sanitize(e.target.value))
                    }
                  />
                </InputGroup>
                <div className="d-flex justify-content-center">
                  <Button
                    className="btn btn-addMedicine w-25"
                    variant="primary"
                    type="submit"
                  >
                    Add
                  </Button>
                </div>
              </Form>
              <Form onSubmit={handleCategory}>
              <Modal show={showCategory} onHide={handleCloseCategory}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Medicine Category</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                    <Form.Label>Category Name:</Form.Label>
                    <Form.Control
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Category Name"
                      value={categoryName}
                      onChange={(e)=>setCategoryName(e.target.value)}
                      required
                    />
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                    value={categoryDescription}
                    onChange={(e)=>setCategoryDescription(e.target.value)}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Category Description"
                      required
                    />
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseCategory}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleCategory}>Update</Button>
                </Modal.Footer>
              </Modal>
              </Form>
              <Form onSubmit={handleType}>
              <Modal show={showType} onHide={handleCloseType}>
                <Modal.Header closeButton>
                  <Modal.Title>Add Medicine Type</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  
                    <Form.Label>Type Name:</Form.Label>
                    <Form.Control
                      value={typename}
                      onChange={(e)=>setTypeName(e.target.value)}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Type Name"
                      required
                    />
                    <Form.Label>Description:</Form.Label>
                    <Form.Control
                      value={typeDescription}
                      onChange={(e)=>setTypeDescription(e.target.value)}
                      aria-label="Default"
                      aria-describedby="inputGroup-sizing-default"
                      placeholder="Enter Type Description"
                      required
                    />
                    <FormControlLabel
                      value="start"
                      control={<Switch color="primary" onChange={()=>setTypeStrip(!typeStrip)}/>}
                      label="Strips"
                      labelPlacement="start"
                    />
                  
                </Modal.Body>
                <Modal.Footer>
                  <Button variant="secondary" onClick={handleCloseType}>
                    Close
                  </Button>
                  <Button variant="primary" type="submit" onClick={handleType}>Update</Button>
                </Modal.Footer>
              </Modal>
              </Form>
            </Card.Body>
          </Card>
        </section>
      </div>
    );
  } else {
    return (
      <div
        className="spinner-border text-primary"
        role="status"
        style={{ marginLeft: "50%", marginTop: "10%" }}
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
};

export default AddMedicine;
