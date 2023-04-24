import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const PharmacyMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { id } = useParams();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/api/pharmacy/${id}`
        );
        console.log(response.data);
        setMedicines(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMedicines();
  }, []);

  const filteredMedicines = medicines.filter((medicine) =>
    medicine.MedicineName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <NavbarCustomer id={id} />
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
                    <Card.Body>
                      <Card.Title>{medicine.MedicineName}</Card.Title>
                      <Card.Subtitle className="description-text mb-2">
                        {medicine.Description}
                      </Card.Subtitle>
                      <Card.Text>
                        <p>Stock: 
                        {medicine.Stock.Pcs && (
                          <p>{medicine.Stock.Pcs} Pieces</p>
                        )}
                        {medicine.Stock.Strips && (
                          <p>{medicine.Stock.Strips} Strips</p>
                        )}
                        {medicine.Stock.Boxes && (
                          <p>{medicine.Stock.Boxes} Boxes</p>
                        )}
                        </p>
                      </Card.Text>
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
