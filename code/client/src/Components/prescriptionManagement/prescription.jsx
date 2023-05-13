import React, { useState, useEffect } from 'react';
import { Card, Button, Form} from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useToken } from '../../Hooks/useToken';
import NavbarCustomer from '../partials/profile/navbarCustomer';

const Prescription = ({ currentUser }) => {
  const [image,setImage]=useState();
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionName, setPrescriptionName] = useState('');
  const user = localStorage.getItem('user');
  const userId = JSON.parse(user)._id;
  const userToken=useToken();
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log("paise");
    if (image) {
      console.log(image);
      const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "med_guard");
        const dataRes = await axios.post(
          "https://api.cloudinary.com/v1_1/dzerdaaku/image/upload",
          formData
        );
      const result=await axios.patch(`http://localhost:4000/api/prescriptions/uploadPrescription/${userId}`,{
        prescriptionImage:dataRes.data.url,
        prescriptionName : prescriptionName
      },{headers: {
        'Authorization': `Bearer ${userToken.token}`
      }});
    }
  }
  useEffect(() => {
    const fetchPrescriptions = async () => {
      const res = await axios.get(`http://localhost:4000/api/prescriptions/getPrescriptions/${userId}`, {
        headers: {
          Authorization: `Bearer ${userToken.token}`,
        },
      }
      );
      const sortedPrescriptions = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPrescriptions(sortedPrescriptions);
    };
    fetchPrescriptions();
  }, [prescriptions, userId, userToken]);


  return (
    <div>
        <div className="mb-5">
        <NavbarCustomer />
      </div>
      <div className='upload-prescription'>
       <div className='heading-prescription'>
       <h2 style={{alignContent: "center", color: "#EB006F"}}>Prescriptions</h2>
       </div>
      <Form onSubmit={handleSubmit}>
        <div className='d-flex flex-column justify-content-center'>
        <div className='d-flex justify-content-center'>
        <Form.Group className="mb-3 w-75" controlId="formBasicEmail">
          <Form.Label>Prescription Name: </Form.Label>
          <Form.Control type="prescriptionName" placeholder="Enter name of your prescription" onChange={(e)=>setPrescriptionName(e.target.value)}/>
        </Form.Group>
        </div>
        <div className='d-flex flex-column justify-content-center w-75 m-auto'>
            <div >
            <Form.Label>Upload Prescription: </Form.Label>
            </div>
           <div>
         <Form.Group className='d-flex justify-content-center w-100'>
          <Form.Control type="file" name="file"
                      accept="image/*"
                      id="imageFileProfile"
                      onChange={(e) => setImage(e.target.files[0])}/>
        <Button className='btn btn-prescription-upload ms-2' type="submit">Upload</Button>
        </Form.Group>
        </div>
        </div>
        </div>
      </Form>
      <hr/>
      <div className="mt-3">
  {prescriptions.map((prescription) => {
    const urlParts = prescription.prescriptionImage.split('http://res.cloudinary.com/dzerdaaku/image/upload/')[1].split('/');
    const prop1 = urlParts[0];
    const prop2 = urlParts[1];
        
    return (

        <Card className="prescription-card my-3">
          <Card.Header className='prescription-card-header'></Card.Header>
          <Card.Body>
            <div className='d-flex justify-content-between'>
          <Link to={`/viewPrescription/${prop1}/${prop2}/${prescription.name}`} className="card-link" key={prescription._id} style={{textDecoration:"none"}}>
              <div>
              <Card.Title>Prescription Name: {prescription.name}</Card.Title>
            <Card.Text> Uploaded on: 
              {new Date(prescription.createdAt).toLocaleString()}
            </Card.Text>
              </div>
      </Link>
            <div>
            <Button href='/orderByPrescription' className='btn btn-prescription-order'>Request Order
            </Button>
            </div>
            </div>
          </Card.Body>
        </Card>
    );
  })}
</div>

      </div>
      
    </div>
  );
};

export default Prescription;
