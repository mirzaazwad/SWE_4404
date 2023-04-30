import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Card, Button, Container, Form, InputGroup } from 'react-bootstrap';
import axios from 'axios';
import NavbarCustomer from '../partials/profile/navbarCustomer';

const Prescription = ({ currentUser }) => {
  const [image,setImage]=useState();
  const [image_Location,setImage_Location]=useState('/demoProilePicture.jpg');
  const [prescriptions, setPrescriptions] = useState([]);
  const [prescriptionName, setPrescriptionName] = useState('');
  const user = localStorage.getItem('user');
  const userId = JSON.parse(user)._id;
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
      setImage_Location(dataRes.data.url);
      const result=await axios.patch(`http://localhost:4000/api/prescriptions/uploadPrescription/${userId}`,{
        prescriptionImage:dataRes.data.url,
        prescriptionName : prescriptionName
      },{headers: {
        'Authorization': `Bearer ${user.token}`
      }});
    }
  }
  useEffect(() => {
    const fetchPrescriptions = async () => {
      const res = await axios.get(`http://localhost:4000/api/prescriptions/getPrescriptions/${userId}`);
      const sortedPrescriptions = res.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    setPrescriptions(sortedPrescriptions);
    };
    fetchPrescriptions();
  }, [prescriptions, userId]);


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
      {prescriptions.map((prescription) => (
          <Card key={prescription._id}  className="prescription-card my-3">
            <Card.Header className='prescription-card-header'></Card.Header>
            <Card.Body>
              <Card.Title>Prescription Name: {prescription.name}</Card.Title>
              <Card.Text> Uploaded on: 
                 {new Date(prescription.createdAt).toLocaleString()}
              </Card.Text>
            </Card.Body>
          </Card>
          ))}
      </div>
      </div>
      
    </div>
  );
};

export default Prescription;
