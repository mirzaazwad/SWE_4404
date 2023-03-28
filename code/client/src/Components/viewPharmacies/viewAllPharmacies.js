import React from 'react';
import PharmacyCard from './pharmacyCard';
import NavbarCustomer from '../profile/navbarCustomer';
import { useParams } from 'react-router-dom';

const Pharmacies = [
  {
    id: 1,
    name: 'ABC Pharmacy',
    location: '123 Main St, Anytown, USA',
    image: 'https://picsum.photos/id/1/200/300',
  },
  {
    id: 2,
    name: 'XYZ Pharmacy',
    location: '456 Oak St, Anytown, USA',
    image: 'https://picsum.photos/id/2/200/300',
  },
  {
    id: 3,
    name: '123 Pharmacy',
    location: '789 Maple St, Anytown, USA',
    image: 'https://picsum.photos/id/3/200/300',
  },
  {
    id: 4,
    name: '123 Pharmacy',
    location: '789 Maple St, Anytown, USA',
    image: 'https://picsum.photos/id/3/200/300',
  },
];

const PharmacyPage = () => {
  const {id}=useParams();
  return (
    <div>
    <NavbarCustomer id={id}/>
    <section >
    <div className="container-fluid pharmacy-container">
      <div className="row">
        {Pharmacies.map((pharmacy) => (
          <div className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4" key={pharmacy.id}>
            <PharmacyCard
              name={pharmacy.name}
              location={pharmacy.location}
              image={pharmacy.image}
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
