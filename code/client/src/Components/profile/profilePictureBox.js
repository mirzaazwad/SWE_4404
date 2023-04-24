import '../../index.css'; // import the CSS file for styling
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
function ProfilePicture(props) {
  console.log('props',props);
  const user=useSelector((state)=>state.userState.user);
  const [modalShow, setModalShow] = useState(false);
  const [image,setImage]=useState('');

  const handleImage=(e)=>{
    console.log(e.target.files[0]);
    setImage(e.target.files[0]);
  }

  console.log(props);
  const handleSubmit = async(e) =>{
    e.preventDefault();
    console.log(image);
    axios.post('/upload',{
      file:image
    },{
      headers:{'Authorization': `Bearer ${user.token}`}
    });
    setModalShow(false);
  }
  
  return (
    <div className="profile-picture-container">
      {<img src={require('../../images/321504286_673183284310305_2418389886188844738_n.jpg')} alt="Profile Picture" />}
      

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
      <Form encType='multipart/form-data' onSubmit={handleSubmit}>
      <Modal.Body>
        <Form.Group controlId="formFile" className="mb-3" onSubmit={handleSubmit} enctype = 'multipart/form-data'>
        <Form.Label>Upload new profile picture</Form.Label>
        <Form.Control type="file" accept=".png, .jpg, .jpeg" name="profile-picture" onChange={handleImage}/>
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

export default ProfilePicture;