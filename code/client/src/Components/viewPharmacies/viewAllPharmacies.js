import React from 'react';
import PharmacyCard from './pharmacyCard';
import NavbarCustomer from '../partials/profile/navbarCustomer';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { LOGOUT, setBuyerUser } from '../../Contexts/action';
const PharmacyPage = () => {
  const [pharmacies, setPharmacies] = useState([]);

    try {
      console.log(user);
      console.log("aaaaaa");
      const response = await axios.get(`http://localhost:4000/api/profile/user/getUser/`+id, {
        headers: { 'Authorization': `Bearer ${user.token}` }
      });
      console.log("aaaaaa");
      console.log(response.data);
      dispatch(setBuyerUser(response.data));
    } catch (error) {
      console.log(error);
      if (error.status === 401) {
        localStorage.removeItem('user');
        dispatch(LOGOUT);
      }
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/pharmacies/");
        setPharmacies(response.data.pharmacies);
      } catch (error) {
        console.log(error);
      }
    };
      retrieveUser();
    fetchData();
  }, []);
  if (!user) {
    return <Navigate to="/" />;
  }

  const { id } = useParams();
  return (
    <div>
      <NavbarCustomer id={id} />
      <section>
        <div className="container-fluid pharmacy-container">
          <div className="row">
            {pharmacies.map((pharmacy) => (
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4" key={pharmacy.id}>
                <Link to={`/Pharmacy/${pharmacy.id}`}>
                  <PharmacyCard
                    name={pharmacy.name}
                    location={pharmacy.location}
                    image={'https://www.mawbiz.com.bd/application/views/module/product_image/IMG_3556_1.JPG'}
                  />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmacyPage;
