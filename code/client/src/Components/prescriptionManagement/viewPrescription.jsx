import React from 'react';
import { Card } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import NavbarCustomer from '../partials/profile/navbarCustomer';

const ViewPrescription = () => {
    const {prop1, prop2, prop3} = useParams();
    console.log(prop1, prop2);
  return (
    <div>
        <div className="mb-5">
        <NavbarCustomer />
      </div>
        <div>
    <Card className='view-prescription-card'>
      <Card.Header style={{backgroundColor: "#EB006F", textAlign: "center", color: "white", fontSize:"1.5rem"}}>
        {prop3}
      </Card.Header>
      <Card.Body>
      <Card.Img variant="top" src={`http://res.cloudinary.com/dzerdaaku/image/upload/${prop1}/${prop2}`}/>
      </Card.Body>
    </Card>
        </div>
    </div>
  );
};

export default ViewPrescription;
