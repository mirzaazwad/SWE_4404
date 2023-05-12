import '../../index.css'; // import the CSS file for styling
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Loader from '../partials/loader';

const ProfilePicture=(props)=>{
  const user=props.user;
  const [modalShow, setModalShow] = useState(false);
  const [image,setImage]=useState();
  const [image_Location,setImage_Location]=useState('/demoProilePicture.jpg');
  const [locked,setLocked]=useState(false);

  useEffect(()=>{
    const retrieveUser=async ()=>{
      await axios.get('/api/profile/user/getUser/'+props.id,{headers: {
        'Authorization': `Bearer ${user.token}`
      }}).then((result)=>{
        setImage_Location(result.data.imageURL);
      })
    };
    retrieveUser();
  },[modalShow,props,user]);

  const handleSubmit = async(e) =>{
    setLocked(true);
    e.preventDefault();
    setModalShow(false);
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
      setLocked(false);
      await axios.patch('/api/profile/user/updateProfilePicture/'+props.id,{
        imageURL:dataRes.data.url
      },{headers: {
        'Authorization': `Bearer ${user.token}`
      }});
    }
  }
  console.log(image_Location);
  if(locked===false){
    return (
      <div className="profile-picture-container">
        <img src={image_Location} alt="Profile Picture" />
        
  
        <p className="edit-profile-picture" onClick={() => setModalShow(true)}>Edit</p>
        <Modal show={modalShow}
          onHide={() => setModalShow(false)}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Change Profile Picture
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3">
          <Form.Label>Upload new profile picture</Form.Label>
          <Form.Control type="file" name="file"
                      accept="image/*"
                      id="imageFileProfile"
                      onChange={(e) => setImage(e.target.files[0])}/>
        </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setModalShow(false)}>
                      Close
                    </Button>
                    <Button variant="primary" type="submit">
                      Save Changes
                    </Button>
          
        </Modal.Footer>
        </Form>
      </Modal>
      </div>
    );
  }
  else{
    return (
      <Loader/>
    );
  }
}

export default ProfilePicture;