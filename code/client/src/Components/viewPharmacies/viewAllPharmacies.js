import React from 'react';
import PharmacyCard from './pharmacyCard';
import NavbarCustomer from '../profile/navbarCustomer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';

const PharmacyPage = () => {
  const [Pharmacies, setPharmacies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/pharmacies/");
        setPharmacies(response.data);
        console.log(response.data);
        console.log(typeof Pharmacies);
        console.log(typeof response.data.data);
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
            
            {Pharmacies.map((pharmacy) => (
              <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4" key={pharmacy.id}>
                <PharmacyCard
                  name={pharmacy.pharmacy}
                  location={pharmacy.address}
                  image={'https://picsum.photos/id/3/200/300'}
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default PharmacyPage;
