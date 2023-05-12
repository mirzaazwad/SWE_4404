import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const Category = (props) => {
  const [showCategory, setShowCategory] = useState(false);
  const handleCloseCategory = () => {
    setShowCategory(false);
    props.onClosing(false);
  }
  const [categoryName,setCategoryName]=useState("");
  const [categoryDescription,setCategoryDescription]=useState("");
  const user=props.user;

  useEffect(()=>{
    setShowCategory(props.showCategory);
  },[props.showCategory])

  const handleCategory = (e) =>{
    handleCloseCategory();
    e.preventDefault();
    axios.post('/api/profile/addMedicine/addCategory',{
      name:categoryName,
      description:categoryDescription
    },{
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    }).then((result)=>{
      console.log(result)
    });
    window.location.reload();
  }



  return (
    <Form onSubmit={handleCategory}>
      <Modal show={showCategory} onHide={handleCloseCategory}>
        <Modal.Header closeButton>
          <Modal.Title>Add Medicine Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label>Category Name:</Form.Label>
          <Form.Control
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Enter Category Name"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            required
          />
          <Form.Label>Description:</Form.Label>
          <Form.Control
            value={categoryDescription}
            onChange={(e) => setCategoryDescription(e.target.value)}
            aria-label="Default"
            aria-describedby="inputGroup-sizing-default"
            placeholder="Enter Category Description"
            required
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseCategory}>
            Close
          </Button>
          <Button variant="primary" type="submit" onClick={handleCategory}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default Category;
