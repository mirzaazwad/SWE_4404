import React from "react";
import { Card, Button } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../Hooks/useToken";

const PharmacyPage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const user = useToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/pharmacies/",
          {
            headers: { Authorization: `Bearer ${user.token}` },
          }
        );
        console.log(response);
        setPharmacies(response.data.pharmacies);
        console.log(response.data.pharmacies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const { id } = useParams();

  return (
    <div>
      <NavbarCustomer id={id} />
      <section>
        <div className="container-fluid pharmacy-container">
          <div className="row">
            {pharmacies.map((pharmacy) => (
              <div
                className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4"
                key={pharmacy.id}
              >
                <Card className="order-prescription-pharmacy-card">
                  <Card.Img
                    variant="top"
                    src={pharmacy.imageURL}
                    className="pharmacy-card-image"
                  />
                  <Card.Body className="order-prescription-pharmacy-card-body">
                    <Card.Title>{pharmacy.name}</Card.Title>
                    <Card.Text style={{display: 'block'}}>location={pharmacy.location}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="order-prescription-pharmacy-footer">
                  <Button className="btn btn-confirm-pharmacy">
                    Request Order
                    </Button>
                  </Card.Footer>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmacyPage;
