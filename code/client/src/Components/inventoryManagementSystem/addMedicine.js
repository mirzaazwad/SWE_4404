import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { useEffect, useState } from "react";
import axios from "axios";
import {useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useSocket } from "../../Hooks/useSocket";
import Category from "../partials/inventoryManagement/addCategory";
import Type from "../partials/inventoryManagement/addType";
import StripsForm from "../partials/inventoryManagement/stripsForm";
import NonStripsForm from "../partials/inventoryManagement/nonStripsForm";

const AddMedicine = () => {
  const user = useSelector((state)=>state.userState.user);
  const id = useParams();
  const _id = id.id;
  useSocket(_id,[]);
  const [categories, setCategories] = useState(null);
  const [types, setTypes] = useState(null);
  const [sellerId, setSellerId] = useState();
  const [error, setError] = useState("");
  const [Strips, setHasStrips] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showType, setShowType] = useState(false);
  const [medicineType, setMedicineType] = useState("Default");
  const handleCategory = (data) =>{
    setShowCategory(data);
  }

  const handleError=(data)=>{
    setError(data);
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
      .get("/api/profile/addMedicine/findCateogry", {
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
    setHasStrips(false);
    types.forEach((elem) => {
      if (elem.hasStrips && elem._id === e) {
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
              {Strips && (<StripsForm _id={_id} user={user} types={types} categories={categories} onError={handleError} sellerId={sellerId} medicineType={medicineType} onHandleType={handleMedicineType}/>)}
              {!Strips && (<NonStripsForm _id={_id} user={user} types={types} categories={categories} onError={handleError}  sellerId={sellerId} medicineType={medicineType} onHandleType={handleMedicineType}/>)}
              <Category showCategory={showCategory} user={user} onClosing={handleCategory}/>
              <Type showType={showType} user={user} onClosing={handleType}/>
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
