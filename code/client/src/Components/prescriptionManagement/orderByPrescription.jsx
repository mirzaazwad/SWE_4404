import React from "react";
import { Card, Button } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../Hooks/useToken";

const OrderByPrescription = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const user = useToken();
  const { id, prop1, prop2 } = useParams();
  const [medicine, setMedicine] = useState([]);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null); // Added state for selected pharmacy ID

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/pharmacies/", {
          headers: { Authorization: `Bearer ${user.token}` },
        });
        console.log(response);
        setPharmacies(response.data.pharmacies);
        setMedicine([
          {
            prescriptionImageURL: `http://res.cloudinary.com/dzerdaaku/image/upload/${prop1}${prop2}`,
            pharmacyManagerId: selectedPharmacyId,
            userId: user._id,
          },
        ]);
        console.log(response.data.pharmacies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedPharmacyId, user.token, prop1, prop2]);

  const handleRequestOrder = async (e, pharmacyId) => {
    e.preventDefault();
    setSelectedPharmacyId(pharmacyId); // Set the selected pharmacy ID
    const user = JSON.parse(localStorage.getItem("user"));
    const response = await axios.post(
      `http://localhost:4000/api/order/postOrder/${user._id}`,
      {
        items: medicine,
        prescritionBasedOrder: true,
      },
      {
        headers: { Authorization: `Bearer ${user.token}` },
      }
    );
    alert("Order has been placed, you will be notified when the order is approved.");
  };

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
                    <Card.Text style={{ display: "block" }}>location={pharmacy.location}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="order-prescription-pharmacy-footer">
                    <Button
                      className="btn btn-confirm-pharmacy"
                      onClick={(e) => handleRequestOrder(e, pharmacy.id)} // Pass the pharmacy ID to handleRequestOrder
                    >
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

export default OrderByPrescription;
