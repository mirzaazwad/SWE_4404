import React, { useState, useEffect } from "react";
import axios from "axios";
import {Link, useLocation } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { useToken } from "../../Hooks/useToken";
import CollapsibleChat from "./collapsibleChat/collapsableChat";
import { Accordion } from "react-bootstrap";

const PharmacyMedicines = () => {
  const user=useToken();
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState([]);
  const [types, setTypes] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("medicine");
  const [selectedCategory, setSelectedCategory] = useState("");
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
          headers:{'Authorization': `Bearer ${user.token}`,
          'idType':user.googleId?'google':'email'}
        });
      setMedicines(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  const fetchCategories = async () => {
    
    try {
      const response = await axios.get('http://localhost:4000/api/pharmacy/getAllCategories',{
        headers:{'Authorization': `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email'}
      });
      console.log(response.data);
      setCategories(response.data);
    } catch (error) {
      console.log("fetch categories kaaj kore na");
    }
  };
  
  const fetchTypes = async () => {
    
    try {
      const response = await axios.get('http://localhost:4000/api/pharmacy/getAllTypes',{
        headers:{'Authorization': `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email'}
      });
      console.log(response.data);
      setTypes(response.data);
    } catch (error) {
      console.log("fetch categories kaaj kore na");
    }
  };
  
  useEffect(() => {
    fetchMedicines();
    fetchCategories();
    fetchTypes();
    console.log(categories);
  }, []);
  
  const handleFilterChange = (e) => {
    setSelectedCategory(e.target.value);
  };
  const filteredMedicines = medicines.filter((medicine) =>
    searchCriteria==="medicine"?medicine.MedicineName.toLowerCase().includes(searchTerm.toLowerCase()):medicine.GenericName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  if (selectedCategory) {
    filteredMedicines = filteredMedicines.filter(
      (medicine) => medicine.category === selectedCategory
    );
  }

  return (
    <div>
  <NavbarCustomer id={id} />
  
  <section>
    <div className="container-fluid pharmacy-container">
      <div className="row">
        <div className="col-2">
          <div className="filter-options">
            <h4>Filter Options:</h4>
              <Accordion>
              <Accordion.Item eventKey="0">
  <Accordion.Header>Category</Accordion.Header>
  <Accordion.Body>
    {categories.map((category) => (
      <div key={category._id}>
        <Form.Check
          type="checkbox"
          label={category.category}
        />
      </div>
    ))}
  </Accordion.Body>
</Accordion.Item>

      <Accordion.Item eventKey="1">
        <Accordion.Header>Type</Accordion.Header>
        <Accordion.Body>
        {types.map((type) => (
      <div key={type._id}>
        <Form.Check
          type="checkbox"
          label={type.Name}
        />
      </div>
    ))}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
          </div>
        </div>
        <div className="col-10">
          <div>
            <div className="d-flex justify-content-center">
              <p style={{ fontSize: "14px", paddingRight: "5px" }}>
                Search By:{" "}
              </p>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setSearchCriteria("medicine")}
                style={{
                  backgroundColor: searchCriteria === "medicine" ? "#EB006F" : "#3b6ce7",
                  border: "none",
                  marginRight: "2px",
                }}
              >
                Medicine
              </Button>
              <Button
                size="sm"
                variant="primary"
                onClick={() => setSearchCriteria("generic")}
                style={{
                  backgroundColor: searchCriteria === "generic" ? "#EB006F" : "#3b6ce7",
                  border: "none",
                }}
              >
                Generic Name
              </Button>
            </div>
            <div className="d-flex justify-content-center" style={{ paddingBottom: "0px" }}>
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
          </div>
          
          <div className="row">
            {filteredMedicines.map((medicine) => (
              <div className="col-xs-6 col-sm-6 col-md-4 col-lg-2 mx-5 my-4" key={medicine._id}>
                <Card className="medicine-card">
                  <Link to={`/pharmacy/medicine?pid=${id}&mid=${medicine._id}&cid=${cid}`} style={{ textDecoration: 'none', color: 'white' }}>
                    <Card.Img variant="top" src={medicine.imageURL} className="medicine-card-image" />
                    <Card.Body>
                      <Card.Title>{medicine.MedicineName}</Card.Title>
                      <Card.Subtitle className="description-text mb-2">
                        {medicine.GenericName}
                      </Card.Subtitle>
                    </Card.Body>
                  </Link>
                </Card>
              </div>
            ))}
          </div>
        </div>
    
          <CollapsibleChat senderID={pid} receiverID={cid} JWT={user} />

      </div>
    </div>
  </section>
</div>

  );
};

export default PharmacyMedicines;
