import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NavbarPharmacy from "../../partials/profile/navbarPharmacy";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
import { useSocket } from "../../../Hooks/useSocket";
import Category from "./addCategory";
import Type from "./addType";
import StripsForm from "./stripsForm";
import NonStripsForm from "./nonStripsForm";
import { useToken } from "../../../Hooks/useToken";
import Loader from "../../partials/loader";

const AddMedicine = () => {
  const user=useToken();
  const _id = useParams().id;
  useSocket(_id,[]);
  const [categories, setCategories] = useState(null);
  const [types, setTypes] = useState(null);
  const [sellerId, setSellerId] = useState();
  const [error, setError] = useState("");
  const [Strips, setHasStrips] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showType, setShowType] = useState(false);
  const [medicineType, setMedicineType] = useState(null);
  const [currentValue,setCurrentValue]=useState({
    medicineName:"",
      genericName:"",
      description:"",
      stripsPerBox:"",
      sellingPrice:"",
      pcsPerStrip:"",
      manufacturer:"",
      purchasePrice:"",
      medicineCateogry:"",
      pcsPerBox:"",
      imageURL:"",
      prescription:false
  });
  const handleCategory = (data) =>{
    setShowCategory(data);
  }

  const handleError=(data)=>{
    setError(data);
  }

  const handleCurrentValue=(data)=>{
    setCurrentValue(data);
  }

  const handleType = (data) => {
    setShowType(data);
  };

  useEffect(() => {
    const retrieveData = async() =>{
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
      .get("/api/profile/addMedicine/findCategory", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setCategories(result.data);
      });
    await axios
      .get("/api/profile/addMedicine/findType", {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        setTypes(result.data);
      });
    }
    retrieveData();
  }, [_id,user.token]);

  const handleMedicineType = (e) => {
    setMedicineType(e);
    console.log('medicine Type is: ',e);
    setHasStrips(false);
    types.forEach((elem) => {
      if (elem.hasStrips && elem._id === e._id) {
        setHasStrips(true);
      }
    });
  };

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
                onClick={() => setShowCategory(true)}
              >
                Add Category
              </Button>
              <Button
                className="btn float-end"
                variant="primary"
                size="sm"
                style={{ height: "100%", marginRight: "0.8%" }}
                onClick={() => setShowType(true)}
              >
                Add Medicine Type
              </Button>
            </Card.Title>
            <Card.Body>
              <div className="errorMessage" style={{ color: "red" }}>
                {error}
              </div>
              {Strips && (<StripsForm _id={_id} currentValue={currentValue} handleCurrentValue={handleCurrentValue} user={user} types={types} categories={categories} onError={handleError} sellerId={sellerId} medicineType={medicineType} onHandleType={handleMedicineType}/>)}
              {!Strips && (<NonStripsForm _id={_id} currentValue={currentValue} handleCurrentValue={handleCurrentValue} user={user} types={types} categories={categories} onError={handleError}  sellerId={sellerId} medicineType={medicineType} onHandleType={handleMedicineType}/>)}
              <Category showCategory={showCategory} user={user} onClosing={handleCategory}/>
              <Type showType={showType} user={user} onClosing={handleType}/>
            </Card.Body>
          </Card>
        </section>
      </div>
    );
  } else {
    return (
      <Loader/>
    );
  }
};

export default AddMedicine;
