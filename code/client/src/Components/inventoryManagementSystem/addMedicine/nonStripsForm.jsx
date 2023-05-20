import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NonStripsForm = ({currentValue,user,onError,medicineType}) => {
  const navigate=useNavigate();
  const [medicineName, setMedicineName] = useState(currentValue.currentValue.medicineName);
  const [genericName, setGenericName] = useState(currentValue.currentValue.genericName);
  const [description, setDescription] = useState(currentValue.currentValue.description);
  const [sellingPrice, setSellingPrice] = useState(currentValue.currentValue.sellingPrice);
  const [pcsPerBox, setPcsPerBox] = useState(currentValue.currentValue.pcsPerBox);
  const [manufacturer, setManufacturer] = useState(currentValue.currentValue.manufacturer);
  const [purchasePrice, setPurchasePrice] = useState(currentValue.currentValue.purchasePrice);
  const [image,setImage]=useState(null);
  const [imageURL,setImageURL] = useState(currentValue.currentValue.imageURL);
  const [prescription,setPrescription]=useState(false);
  const [locked,isLocked]=useState(false);
  const [medicineCategory, setMedicineCategory] = useState(currentValue.currentValue.medicineCategory);

  const handleMedicineType=(data)=>{
    medicineType.setMedicineType(data);
    currentValue.handleCurrentValue({
      medicineName:medicineName,
      genericName:genericName,
      description:description,
      pcsPerBox:pcsPerBox,
      sellingPrice:sellingPrice,
      stripsPerBox:currentValue.currentValue.stripsPerBox,
      pcsPerStrip:currentValue.currentValue.pcsPerStrip,
      manufacturer:manufacturer,
      purchasePrice:purchasePrice,
      medicineCategory:medicineCategory,
      imageURL:imageURL,
      prescription:prescription,
      medicineCategory:medicineCategory
    });
    medicineType.onHandleType(data);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    isLocked(true);
    if (medicineType.medicineType === null) {
      onError("Medicine Type is required");
      return;
    }
    if (medicineCategory ===null) {
      onError("Medicine Category is required");
      return;
    }
    const medicineInformation={
      MedicineName: medicineName,
      GenericName: genericName,
      Type: medicineType.medicineType,
      Category: medicineCategory,
      PcsPerBox: pcsPerBox,
      Manufacturer: manufacturer,
      SellingPrice: sellingPrice,
      PurchasePrice: purchasePrice,
      Description: description,
      imageURL:imageURL,
      prescription:prescription
    }
    if(image){
      await user.addNewMedicine(medicineInformation,image);
      isLocked(false);
      navigate("/inventoryManagementSystem/inventory");
    }
    else{
      isLocked(false);
      onError("Image of medicine is required");
    }
  };
  return (
    <Form onSubmit={handleSubmit}>
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
              value={medicineType.medicineType===null?"default":medicineType.medicineType._id}
              onChange={(e) => {
                handleMedicineType(user.types.find(element => element._id === e.target.value));
              }}
            >
              <option value="default" key="default">Select an option</option>
              {user.types && user.types.length !== 0 &&
                user.types.map((medicines) => (
                  <option value={medicines._id} key={medicines._id}>{medicines.Name}</option>
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
              value={medicineCategory===null?"default":medicineCategory._id}
              onChange={(e) => setMedicineCategory(user.categories.find(element => element._id === e.target.value))}
            >
              <option value="default" key="default">Select an option</option>
              {user.categories && user.categories.length !== 0 &&
                user.categories.map((category) => (
                  <option value={category._id} key={category._id}>{category.category}</option>
                ))}
            </Form.Select>
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
          onChange={(e) => setPcsPerBox(DOMPurify.sanitize(e.target.value))}
          required
        />
      </InputGroup>
      <InputGroup className="mb-4">
        <InputGroup.Text id="inputGroup-sizing-default">
          Description
        </InputGroup.Text>
        <Form.Control
          as="textarea"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Add a description of the medicine, diagnosis, treatment, prevention of disease and side effects."
          value={description}
          onChange={(e) => setDescription(DOMPurify.sanitize(e.target.value))}
        />
      </InputGroup>
      <Form.Group className="mb-4">
          <Form.Label>Upload Image for Medicine Identification<span style={{color:"red"}}>*</span></Form.Label>
          <Form.Control type="file" name="file"
                      accept="image/*"
                      id="imageFileProfile"
                      onChange={(e) => setImage(e.target.files[0])} required/>
        </Form.Group>
        <Form.Group className="mb-4">
        <Form.Label>Prescription Required ?</Form.Label>
        <Switch color="primary" onChange={()=>setPrescription(!prescription)}>
        </Switch>
        </Form.Group>
      <div className="d-flex justify-content-center">
        <Button
          className="btn btn-add w-25"
          type="submit"
          disabled={locked}
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

export default NonStripsForm;
