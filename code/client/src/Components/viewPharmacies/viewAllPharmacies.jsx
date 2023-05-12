import React from 'react';
import PharmacyCard from './pharmacyCard';
import NavbarCustomer from '../partials/profile/navbarCustomer';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToken } from '../../Hooks/useToken';

const PharmacyPage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const user=useToken();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/pharmacies/",{
          headers:{'Authorization': `Bearer ${user.token}`}
        });
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
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4" key={pharmacy.id}>
                <Link to={`/Pharmacy?id=${pharmacy.id}&pid=${pharmacy.pharmacyManagerID}&cid=${id}`} style={{textDecoration: 'none', color: 'white'}} >
                  <PharmacyCard
                    name={pharmacy.name}
<<<<<<< HEAD:code/client/src/Components/viewPharmacies/viewAllPharmacies.js
                    location={pharmacy.location}
                    image={pharmacy.imageUrl}
=======
                    address={pharmacy.location}
                    image={pharmacy.imageURL}
>>>>>>> 3812edda2f5133a8f933f8609aec5d0e36ab4c28:code/client/src/Components/viewPharmacies/viewAllPharmacies.jsx
                    color= {'#EB006F'}
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