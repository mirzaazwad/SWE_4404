import '../../index.css'; // import the CSS file for styling
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState } from 'react';
import axios from 'axios';
function ProfilePicture() {

  const [modalShow, setModalShow] = useState(false);
    const [newUser, setNewUser] = useState(
        {
            imageURL: '',
        }
    )
      const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('photo', newUser.imageURL);

        axios.post('http://localhost:4000/api/profile/profilePicture', formData)
             .then(res => {
                console.log(res);
             })
             .catch(err => {
                console.log(err);
             });
    }
    

  const handlePhoto = (e) => {
      setNewUser({...newUser, imageURL: e.target.files[0]});
  }
  return (
    <div className="profile-picture-container">
      {console.log(newUser.imageURL.name)};
      
      <img src={newUser.imageURL} alt="Profile Picture" />
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
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3" onSubmit={handleSubmit} enctype = 'multipart/form-data'>
        <Form.Label>Upload new profile picture</Form.Label>
        <Form.Control type="file" onChange = {handlePhoto} />
      </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={() => setModalShow(false)}>
                    Close
                  </Button>
                  <Button variant="primary" type='submit'>
                    Save Changes
                  </Button>
      </Modal.Footer>
    </Modal>
    </div>
  );
}

export default ProfilePicture;
