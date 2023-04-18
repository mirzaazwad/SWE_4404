import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';

const PharmacyMedicines = ({  }) => {
  const [medicines, setMedicines] = useState([]);
  const {id }= useParams()

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

  return (
    <div>
      <h1>Medicines Available:</h1>
      {medicines.map((medicine) => (
        <div key={medicine._id}>
          <h2>{medicine.MedicineName}</h2>
          <p>{medicine.Description}</p>
          <p>Stock:</p>
          {medicine.Stock.Pcs && <p>{medicine.Stock.Pcs} Pieces</p>}
          {medicine.Stock.Strips && <p>{medicine.Stock.Strips} Strips</p>}
          {medicine.Stock.Boxes && <p>{medicine.Stock.Boxes} Boxes</p>}
        </div>
      ))}
    </div>
  );
};

export default PharmacyMedicines;
