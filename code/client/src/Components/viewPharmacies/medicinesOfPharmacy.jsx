import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useToken } from "../../Hooks/useToken";
import CollapsibleChat from "./collapsibleChat/collapsableChat";

const PharmacyMedicines = () => {
  const user=useToken();
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const location=useLocation();
  const queryParams = new URLSearchParams(location.search);
  const id = queryParams.get('id');
  const cid = queryParams.get('cid');
  const pid=queryParams.get('pid');

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(
        `http://localhost:4000/api/pharmacy/${id}`
        ,{
          headers:{'Authorization': `Bearer ${user.token}`}
        });
      setMedicines(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchCategories = async () => {
    try {
      const response = await axios.get(`http://localhost:4000/api/pharmacy/getAllCategories/`,{
        headers:{'Authorization': `Bearer ${user.token}`}
      });
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchMedicines();
    fetchCategories();
  }, []);
  

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.MedicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavbarCustomer id={id} />
      <CollapsibleChat senderID={pid} receiverID={cid}  JWT={user}/>
      <section>
        <div className="container-fluid pharmacy-container">
          {/* <h1>Medicines Available:</h1> */}
          <div className="d-flex justify-content-center">
            <Form className="search-input d-flex">
              <Form.Control
                type="search"
                className=" me-2"
                aria-label="Search"
                placeholder="Search for a medicine..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="btn btn-search h-100">Search</Button>
            </Form>
          </div>
          <div className="row">
            {filteredMedicines.map((medicine) => (
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4" key={medicine._id}>
                <Card className="medicine-card">
                  <Link to={`/pharmacy/${id}/medicine/${medicine._id}`} style={{textDecoration: 'none', color: 'white'}}>
                    <Card.Img variant="top" src={medicine.imageURL} className="medicine-card-image" style={{width: '25%'}}/>
                    <Card.Body>
                      <Card.Title>{medicine.MedicineName}</Card.Title>
                      <Card.Subtitle className="description-text mb-2">
                        {medicine.Description}
                      </Card.Subtitle>
                    </Card.Body>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmacyMedicines;
