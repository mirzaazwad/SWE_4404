import axios from "axios";
import DOMPurify from "dompurify";
import { useEffect, useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Switch } from "@mui/material";
import { useNavigate } from "react-router-dom";

const StripsForm = (props) => {
  const navigate=useNavigate();
  const _id=props._id;
  const sellerId=props.sellerId;
  const user = props.user;
  const types=props.types;
  const categories=props.categories;
  const [medicineName, setMedicineName] = useState(props.currentValue.medicineName);
  const [genericName, setGenericName] = useState(props.currentValue.genericName);
  const [description, setDescription] = useState(props.currentValue.description);
  const [stripsPerBox, setStripsPerBox] = useState(props.currentValue.stripsPerBox);
  const [sellingPrice, setSellingPrice] = useState(props.currentValue.sellingPrice);
  const [pcsPerStrip, setPcsPerStrip] = useState(props.currentValue.pcsPerStrip);
  const [manufacturer, setManufacturer] = useState(props.currentValue.manufacturer);
  const [purchasePrice, setPurchasePrice] = useState(props.currentValue.purchasePrice);
  const [medicineType,setMedicineType]=useState(props.medicineType);
  const [image,setImg]=useState(null);
  const [imageURL,setImageURL] = useState(props.currentValue.imageURL);
  const [prescription,setPrescription]=useState(props.currentValue.setPrescription);
  const [locked,isLocked]=useState(false);
  const [medicineCategory, setMedicineCategory] = useState(null);

  const setError=(error)=>{
    props.onError(error);
  }

  useEffect(()=>{
    setMedicineType(props.medicineType)
  },[props])

  const handleMedicineType=(data)=>{
    setMedicineType(data);
    props.handleCurrentValue({
      medicineName:medicineName,
      genericName:genericName,
      description:description,
      stripsPerBox:stripsPerBox,
      sellingPrice:sellingPrice,
      pcsPerStrip:pcsPerStrip,
      manufacturer:manufacturer,
      purchasePrice:purchasePrice,
      medicineCategory:medicineCategory,
      pcsPerBox:props.currentValue.pcsPerBox,
      imageURL:imageURL,
      prescription:prescription
    });
    props.onHandleType(data);
  }

  const setImage=async(e)=>{
    setImg(e);
    if(e){
      isLocked(true);
      const formData = new FormData();
        formData.append("file", e);
        formData.append("upload_preset", "med_guard");
        const dataRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dzerdaaku/image/upload",
          formData
        );
      setImageURL(dataRes.data.url);
      isLocked(false);
    }
  }

  const handleSubmit = async(e) => {
    isLocked(true);
    e.preventDefault();
    if (medicineType === null) {
      setError("Medicine Type is required");
      return;
    }
    if (medicineCategory === null) {
      setError("Medicine Category is required");
      return;
    }
    await axios
      .post(
        "/api/profile/addMedicine/addNewGlobalMedicine",
        {
          MedicineName: medicineName,
            GenericName: genericName,
            Type: medicineType,
            Category: medicineCategory,
            StripsPerBox: stripsPerBox,
            PcsPerStrip: pcsPerStrip,
            Manufacturer: manufacturer,
            SellingPrice: sellingPrice,
            PurchasePrice: purchasePrice,
            Description: description,
            imageURL:imageURL,
            prescription:prescription
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      .catch((err) => console.log(err));
      await axios
        .patch(
          "/api/profile/addMedicine/addNewMedicine/" + sellerId,
          {
            MedicineName: medicineName,
            GenericName: genericName,
            Type: medicineType,
            Category: medicineCategory,
            StripsPerBox: stripsPerBox,
            PcsPerStrip: pcsPerStrip,
            Manufacturer: manufacturer,
            SellingPrice: sellingPrice,
            PurchasePrice: purchasePrice,
            Description: description,
            imageURL:imageURL,
            prescription:prescription
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((result) => {
          return navigate("/inventoryManagementSystem/inventory/" + _id);
        })
        .catch((err) => console.log(err));
        isLocked(false);
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
              value={props.medicineType===null?"default":props.medicineType.Name}
              onChange={(e) => {
                handleMedicineType(types.find(element => element._id === e.target.value));
              }}
            >
              <option value="default">Select an option</option>
              {types.length !== 0 &&
                types.map((medicines) => (
                  <option value={medicines._id}>{medicines.Name}</option>
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
              onChange={(e) => setMedicineCategory(categories.find(element => element._id === e.target.value))}
              value={medicineCategory===null?"defaultCategory":medicineCategory.Name}
            >
              <option value="defaultCategory">Select an option</option>
              {categories.length !== 0 &&
                categories.map((category) => (
                  <option value={category._id}>{category.category}</option>
                ))}
            </Form.Select>
          </InputGroup>
        </div>
      </div>
      <br/>
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
          Pieces per Strip
        </InputGroup.Text>
        <Form.Control
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Enter number"
          type="number"
          value={pcsPerStrip}
          onChange={(e) => setPcsPerStrip(DOMPurify.sanitize(e.target.value))}
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
          className="btn btn-addMedicine w-25"
          variant="primary"
          type="submit"
        >
          Add
        </Button>
      </div>
    </Form>
  );
};

export default StripsForm;
