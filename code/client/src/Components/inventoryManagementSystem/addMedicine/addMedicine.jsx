import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import NavbarPharmacy from "../../partials/profile/navbarPharmacy";
import { useEffect, useState } from "react";
import { useSocket } from "../../../Hooks/useSocket";
import Category from "./addCategory";
import Type from "./addType";
import StripsForm from "./stripsForm";
import NonStripsForm from "./nonStripsForm";
import { useToken } from "../../../Hooks/useToken";
import Loader from "../../partials/loader";
import pharmacyInventory from "../../../Library/Pharmacy/pharmacy";
import allMedicines from "../../../Library/Pharmacy/medicine";

const AddMedicine = () => {
  const user=useToken();
  useSocket(user._id,[]);
  const [inventory,setInventory]=useState(null);
  const [medicines,setMedicines]=useState(null);
  const [error, setError] = useState("");
  const [Strips, setHasStrips] = useState(false);
  const [showCategory, setShowCategory] = useState(false);
  const [showType, setShowType] = useState(false);
  const [medicineType, setMedicineType] = useState(null);
  const [currentValue,setCurrentValue]=useState({medicineName:"",genericName:"",description:"",stripsPerBox:"",
      sellingPrice:"",pcsPerStrip:"",manufacturer:"",purchasePrice:"",medicineCategory:"",pcsPerBox:"",imageURL:"",prescription:false
  });

  const handleError=(data)=>{
    setError(data);
  }

  const handleCurrentValue=(data)=>{
    setCurrentValue(data);
  }

  useEffect(() => {
    const retrieveData = async() =>{
      const pharmacy=new pharmacyInventory(user._id,user.token,user.googleId);
      await pharmacy.retrieveInformation();
      const medicine=new allMedicines(user._id,user.token,user.googleId);
      await medicine.getAllCategories();
      await medicine.getAllTypes();
      setMedicines(medicine);
      setInventory(pharmacy);
    }
    retrieveData();
  }, [user]);

  const handleMedicineType = (e) => {
    setMedicineType(e);
    setHasStrips(false);
    medicines.types.forEach((elem) => {
      if (elem.hasStrips && elem._id === e._id) {
        setHasStrips(true);
      }
    });
  };

  if (inventory && medicines) {
    return (
      <div>
        <NavbarPharmacy user={user}/>
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
                className="btn btn-add float-end"
                size="sm"
                style={{ height: "100%", marginRight: "0.8%" }}
                onClick={() => setShowCategory(true)}
              >
                Add Category
              </Button>
              <Button
                className="btn btn-add float-end"
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
              {Strips && (<StripsForm currentValue={{currentValue:currentValue,handleCurrentValue:handleCurrentValue}} user={medicines} onError={handleError} medicineType={{medicineType:medicineType,setMedicineType:setMedicineType,onHandleType:handleMedicineType}}/>)}
              {!Strips && (<NonStripsForm currentValue={{currentValue:currentValue,handleCurrentValue:handleCurrentValue}} user={medicines} onError={handleError} medicineType={{medicineType:medicineType,setMedicineType:setMedicineType,onHandleType:handleMedicineType}}/>)}
              <Category showCategory={{show:showCategory,onClosing:setShowCategory}} user={{medicines:medicines,setMedicines:setMedicines}}/>
              <Type showType={{show:showType,onClosing:setShowType}} user={{medicines:medicines,setMedicines:setMedicines}}/>
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
