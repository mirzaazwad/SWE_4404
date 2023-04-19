import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import NavbarCustomer from '../partials/profile/navbarCustomer';

const PharmacyMedicines = () => {
  const [medicines, setMedicines] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const { id } = useParams();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(`http://localhost:4000/api/pharmacy/${id}`);
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
     <div className='container-fluid pharmacy-container'>
      <h1>Medicines Available:</h1>
      <input
        type="text"
        placeholder="Search for a medicine..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {filteredMedicines.map((medicine) => (
        <div key={medicine._id}> 
            <Card className='medicine_card mb-2 ms-2'>
          <Link to={`/pharmacy/${id}/medicine/${medicine._id}`}>
              <Card.Body>
                <Card.Title>{medicine.MedicineName}</Card.Title>
                <Card.Subtitle className='mb-2 text-muted'>
                  {medicine.Description}
                </Card.Subtitle>
                <Card.Text>
                  <p>Stock:</p>
                  {medicine.Stock.Pcs && <p>{medicine.Stock.Pcs} Pieces</p>}
                  {medicine.Stock.Strips && (
                    <p>{medicine.Stock.Strips} Strips</p>
                  )}
                  {medicine.Stock.Boxes && <p>{medicine.Stock.Boxes} Boxes</p>}
                </Card.Text>
              </Card.Body>
          </Link>
            </Card>
        </div>
      ))}
    </div>
    </section>
    </div>
    
  );
};

export default PharmacyMedicines;
