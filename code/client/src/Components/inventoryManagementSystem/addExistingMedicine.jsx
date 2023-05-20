import { useEffect, useState } from "react";
import { InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";
import allMedicines from "../../Library/Pharmacy/medicine";
import Loader from "../partials/loader";

const AddExistingMedicine = ({user,show}) => {
  const [medicines,setMedicines]=useState(null);
  const [medicine,setMedicine]=useState(null);

  useEffect(() => {
    const retrieveMedicines = async () => {
      const medicine=new allMedicines(user.inventory._id,user.inventory.token,user.inventory.googleId);
      await medicine.getAllMedicines();
      setMedicines(medicine);
    };

    retrieveMedicines();

  }, [user]);

  const handleMedicines = async() => {
    await medicines.addMedicine(medicine);
    let obj = Object.create(Object.getPrototypeOf(user.inventory), Object.getOwnPropertyDescriptors(user.inventory));
    obj.addMedicine(medicines.medicineMap.get(medicine));
    user.setInventory(obj);
    show.onClosing(false);
  };

  if(medicines){
    return (
      <Form onSubmit={handleMedicines}>
        <Modal show={show.show} onHide={()=>show.onClosing(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Medicine</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <div className="d-flex justify-content-between mb-2">
          <Link to={"/inventoryManagementSystem/addMedicine/"} style={{textDecoration: "none"}}>
                <Button className="btn btn-add" variant="primary">
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
                    {medicines.medicines.length !== 0 &&
                      medicines.medicines.map((medicine) => (
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
            <Button variant="secondary" onClick={()=>show.onClosing(false)}>
              Close
            </Button>
            <Button variant="primary" type="submit" onClick={handleMedicines}>
              Add
            </Button>
          </Modal.Footer>
        </Modal>
      </Form>
    );
  }
  else{
    <Loader/>
  }
};

export default AddExistingMedicine;
