import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect,useState } from 'react';
import Loader from '../partials/loader';
import buyerUser from '../../Library/User/buyer';
import pharmacyManager from '../../Library/User/pharmacy-manager';
import deliveryUser from '../../Library/User/delivery-man';

const ProfilePicture=({user})=>{
  const [modalShow, setModalShow] = useState(false);
  const [image,setImage]=useState();
  const [userObj,setUser]=useState(null);
  const [locked,setLocked]=useState(false);
  const [imageURL,setImageURL]=useState('/demoProfilePicture.jpg');

  useEffect(()=>{
    if((user instanceof buyerUser)){
      setUser(user);
      console.log(user);
      setImageURL(user.imageURL);
    }
    else if((user instanceof pharmacyManager)){
      setUser(user);
      console.log(user);
      setImageURL(user.imageURL);
    }
    else if(user instanceof deliveryUser){
      setUser(user);
      console.log(user);
      setImageURL(user.imageURL);
    }
  },[user])

  const handleSubmit = async(e) =>{
    e.preventDefault();
    setModalShow(false);
    if (image) {
      setLocked(true);
      let obj = Object.create(Object.getPrototypeOf(userObj), Object.getOwnPropertyDescriptors(userObj));
      obj.image=image;
      await obj.updateProfilePicture();
      setUser(obj);
      setImageURL(obj.imageURL);
      setLocked(false);
    }
  }

  if(locked===false){
    return (
      <div className="profile-picture-container">
        <img src={imageURL} alt="Profile Picture" />
        
  
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