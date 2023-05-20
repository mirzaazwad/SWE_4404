import React from "react";
import { Card, Button } from "react-bootstrap";
import NavbarCustomer from "../partials/profile/navbarCustomer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useToken } from "../../Hooks/useToken";
import { useLocation, useNavigate } from "react-router-dom";

const OrderByPrescription = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const user = useToken();
  const navigate=useNavigate();
  const { id, prop1, prop2 } = useParams();
  const [medicine, setMedicine] = useState([]);
  const [location,setLocation]=useState(null);
  const [customerEmail,setCustomerEmail]=useState("");
  const [customerPhoneNumber,setCustomerNumber]=useState("");
  const [fullName, setFullName] = useState();
  const [address, setAddress] = useState();
  const [payment, setPayment] = useState(null);
  const [selectedPharmacyId, setSelectedPharmacyId] = useState(null); // Added state for selected pharmacy ID

  useEffect(() => {
    const retrieveUser = async () => {
      await axios.get('/api/profile/buyer/' + user._id, {
        headers: {
          'Authorization': `Bearer ${user.token}`,
          'idType': user.googleId ? 'google' : 'email'
        }
      }).then((result) => {
        setLocation(result.data.coordinates);
        setAddress(result.data.address);
        setFullName(result.data.username);
        setCustomerNumber(result.data.phone);
        setCustomerEmail(result.data.email);
      });
    };
    retrieveUser();
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/pharmacies/", {
          headers: { Authorization: `Bearer ${user.token}` ,
          'idType':user.googleId?'google':'email'},
        });
        console.log(response);
        setPharmacies(response.data.pharmacies);
        console.log(response.data.pharmacies);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [selectedPharmacyId, user.token, prop1, prop2]);

  const handleRequestOrder = async (e, pharmacyId) => {
   
    console.log(pharmacyId,'is pharmacy ID');
    setSelectedPharmacyId(pharmacyId);
    const user = JSON.parse(localStorage.getItem("user"));
  
    const response = await axios
      .post(
        `http://localhost:4000/api/order/postOrder/${user._id}`,
        {
          items: medicine,
          customer_data: {
            email: customerEmail,
            phone: customerPhoneNumber,
            pharmacyManagerID: pharmacyId,
            fullName: fullName,
            address: address,
            amount: 0,
          },
          prescription_image: `http://res.cloudinary.com/dzerdaaku/image/upload/${prop1}/${prop2}`,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'idType': user.googleId ? 'google' : 'email'
          },
        }
      )
      .then((response) => {
        // Handle the response and navigate to the myOrders page
        console.log("Order placed successfully:", response);
      })
      .catch((error) => {
        console.error('Failed to request order:', error);
        // Handle the error
      });
      navigate('/myOrders');
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
                    <Card.Title>{pharmacy.pharmacy}</Card.Title>
                    <Card.Text style={{ display: "block" }}>{pharmacy.address}</Card.Text>
                  </Card.Body>
                  <Card.Footer className="order-prescription-pharmacy-footer">
                    <Button
                      className="btn btn-confirm-pharmacy"
                      onClick={(e) => handleRequestOrder(e, pharmacy._id)} 
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