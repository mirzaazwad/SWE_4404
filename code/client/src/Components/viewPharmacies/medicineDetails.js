import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const MedicineDetails = () => {

  const [medicine, setMedicine] = useState({});
  const { id, medicineId } = useParams();

  const fetchMedicine = async (id, medicineId) => {
    try {
      const response = await axios.get(`http://localhost:4000/api/pharmacy/${id}/medicine/${medicineId}`);
      console.log(response.data);
      setMedicine(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  
  useEffect(() => {
    fetchMedicine(id, medicineId);
  }, []);
  
  return (
    <div>
      <h1>{medicine.MedicineName}</h1>
      <p>{medicine.Description}</p>
      <p>Price: {medicine.Price}</p>
      <p>Manufacturer: {medicine.Manufacturer}</p>
      <p>Stock:</p>
      {medicine.Stock && (
        <div>
          {medicine.Stock.Pcs && <p>{medicine.Stock.Pcs} Pieces</p>}
          {medicine.Stock.Strips && <p>{medicine.Stock.Strips} Strips</p>}
          {medicine.Stock.Boxes && <p>{medicine.Stock.Boxes} Boxes</p>}
        </div>
      )}
    </div>
  );
};

export default MedicineDetails;
