import axios from "axios";
import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { InputGroup } from "react-bootstrap";
import { EyeFill, EyeSlashFill } from "react-bootstrap-icons";
import "../../index.css";
import "boxicons";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import { setSellerUser, LOGOUT } from "../../Contexts/action";

const ViewMedicine = () => {
  //   const seller=useSelector((state) => state.userState.sellerState);
  //   const user=useSelector((state) => state.userState.user);
  const [show, setShow] = useState(false);
  const [type, setType] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = (type) => {
    setShow(true);
    setType(type);
  };
  const { id } = useParams();
  //   const dispatch=useDispatch();
  //   const retrieveUser = async() =>{
  //     await axios.get('/api/profile/user/'+id,{
  //       headers:{'Authorization': `Bearer ${user.token}`}
  //     }).then((result)=>{
  //       dispatch(setBuyerUser(result.data));
  //     })
  //     .catch((error)=>{
  //       console.log(error);
  //       if(error.status===401){
  //         localStorage.removeItem('user');
  //         dispatch(LOGOUT);
  //       }
  //     });
  //   };
  //   useEffect(()=>{
  //     retrieveUser();
  //   },[]);
  const [filterOption, setFilterOption] = useState("");

  const handleFilterChange = (event) => {
    setFilterOption(event.target.value);
  };

  const handleFilterValueChange = (event) => {
    const value = event.target.value;
    setFilteredMedicines(
      medicines.filter((medicine) =>
        medicine[filterOption].toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  const [medicines, setMedicines] = useState([
    {
      id: 1,
      medicineName: "Medicine 1",
      genericName: "Generic 1",
      type: "Type 1",
      manufacturer: "Manufacturer 1",
      sellPrice: "10",
      purchasePrice: "5",
      amount: "3",
    },
    {
      id: 2,
      medicineName: "Medicine 2",
      genericName: "Generic 2",
      type: "Type 2",
      manufacturer: "Manufacturer 2",
      sellPrice: "20",
      purchasePrice: "10",
      amount: "10",
    },
  ]);

  useEffect(() => {
    setFilteredMedicines(medicines);
  }, [medicines]);
  const [filteredMedicines, setFilteredMedicines] = useState(medicines);

  return (
    <div className="d-flex w-75 m-auto  flex-column">
      <div className="d-flex justify-content-end align-items-center">
        <Form.Label className="me-2 mb-0"> Filter By: </Form.Label>{" "}
        <Form.Select className="w-auto" onChange={handleFilterChange}>
          <option value="select..."> select... </option>
          <option value="manufacturer"> Manufacturer </option>{" "}
          <option value="genericName"> Generic Name </option>{" "}
          <option value="type"> Type </option>{" "}
        </Form.Select>{" "}
        <Form.Control
          className="w-auto"
          type="text"
          placeholder="enter value"
          onChange={handleFilterValueChange}
        />{" "}
      </div>
      <div className="d-flex justify-content-center">
        <Table striped bordered hover>
          <thead>
            <tr>
              <th> SL </th> <th> Medicine Name </th> <th> Generic Name </th>{" "}
              <th> Type </th> <th> Manufacturer </th> <th> Sell Price </th>{" "}
              <th> Purchase Price </th> <th> Amount </th> <th> Action </th>{" "}
            </tr>{" "}
          </thead>{" "}
          <tbody>
            {" "}
            {filteredMedicines.map((medicine) => (
              <tr key={medicine.id}>
                <td> {medicine.id} </td> <td> {medicine.medicineName} </td>{" "}
                <td> {medicine.genericName} </td> <td> {medicine.type} </td>{" "}
                <td> {medicine.manufacturer} </td>{" "}
                <td> {medicine.sellPrice} </td>{" "}
                <td> {medicine.purchasePrice} </td> <td> {medicine.amount} </td>{" "}
                <td>
                  <Button
                    variant="secondary"
                    className="mx-0 plusButton"
                    onClick={() => handleShow("add")}
                  >
                    {" "}
                    <i
                      class="bx bxs-plus-circle plusIcon"
                      style={{ fontSize: "24px" }}
                    ></i>
                  </Button>
                  <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                      <Modal.Title>
                        {type === "add" ? "Add to stock" : "Remove from stock"}
                      </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                      <Form>
                        <Form.Label>Quantity Type:</Form.Label>
                        <Form.Select aria-label="Default select example">
                          <option>Select quantity type</option>
                          <option value="1">Pcs</option>
                          <option value="2">Strips</option>
                          <option value="3">Box</option>
                        </Form.Select>
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                          aria-label="Default"
                          aria-describedby="inputGroup-sizing-default"
                          placeholder="Enter amount"
                          required
                        />
                      </Form>
                    </Modal.Body>
                    <Modal.Footer>
                      <Button variant="secondary" onClick={handleClose}>
                        Close
                      </Button>
                      <Button variant="primary" onClick={handleClose}>
                        Update
                      </Button>
                    </Modal.Footer>
                  </Modal>
                  <Button
                    variant="danger"
                    className="mx-0 minusButton"
                    onClick={() => handleShow("remove")}
                  >
                    {" "}
                    <i
                      class="bx bxs-minus-circle minusIcon"
                      style={{ fontSize: "24px" }}
                    ></i>{" "}
                  </Button>{" "}
                </td>{" "}
              </tr>
            ))}{" "}
          </tbody>{" "}
        </Table>{" "}
      </div>{" "}
    </div>
  );
};
export default ViewMedicine;
