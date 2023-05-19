import axios from "axios";
import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

const AddExistingMedicine = (props) => {
  const [medicines, setMedicines] = useState([]);
  const [medicine,setMedicine]=useState(null);
  const [sellerId,setSellerId]=useState();
  const [medicineMap,setMedicineMap]=useState(new Map());
  const [showMedicines,setShowMedicines]=useState(false);
  const _id=props.id;

  useEffect(()=>{
    setShowMedicines(props.show);
  },[props.show])

  const user = props.user;
  useEffect(() => {
    const retrieveData = async() =>{
      await axios
      .get("/api/profile/user/getUserSellerId/" + _id, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email',
        },
      })
      .then((response) => {
        setSellerId(response.data._id);
      })
      .catch((err) => console.log(err));
    }

    retrieveData();
    const retrieveMedicines = async () => {
      const result = await axios.get(
        "/api/profile/addMedicine/findAllMedicines",
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'idType':user.googleId?'google':'email',
          },
        }
      );
      setMedicines(result.data.result);
      result.data.result.forEach((medicine)=>medicineMap.set(medicine.MedicineName,medicine));
    };
    if(user.token!==null){
      retrieveMedicines();
    }
  }, [user.token]);

  const handleMedicines = async() => {
    await axios
        .patch(
          "/api/profile/addMedicine/addNewMedicine/" + sellerId,
          {
            ...medicineMap.get(medicine)
          },
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              'idType':user.googleId?'google':'email',
            },
          }
        ).then(()=>window.location.reload())
        .catch((err) => console.log(err));
  };

  const handleCloseMedicines = () => {
    setShowMedicines(false);
    props.onClosing(false);
  };

  return (
    <Form onSubmit={handleMedicines}>
      <Modal show={showMedicines} onHide={handleCloseMedicines}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Medicine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="d-flex justify-content-between mb-2">
            <Link to={"/inventoryManagementSystem/addMedicine/" + props.id} style={{textDecoration: "none"}}>
              <Button className="btn btn-add">
                Add New Brand <i className="bx bx-plus-circle bx-sm"></i>
              </Button>
            </Link>
          </div>
          <div className="addMedicineSide d-flex justify-content-between">
            <div className="w-100 me-2">
              <InputGroup className="mb-1">
                <InputGroup.Text
                  className="required-field"
                  id="inputGroup-sizing-default"
                >
                  Select Medicine
                </InputGroup.Text>
                <Form.Select
                  aria-label="Select an option"
                  placeholder="Select an option"
                  onChange={(e) => setMedicine(e.target.value)}
                >
                  <option value="default">Select an option</option>
                  {medicines.length !== 0 &&
                    medicines.map((medicine) => (
                      <option value={medicine.MedicineName}>
                        {medicine.MedicineName}
                      </option>
                    ))}
                </Form.Select>
              </InputGroup>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseMedicines}>
            Close
          </Button>
          <Button className="btn btn-add" type="submit" onClick={handleMedicines}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default AddExistingMedicine;
