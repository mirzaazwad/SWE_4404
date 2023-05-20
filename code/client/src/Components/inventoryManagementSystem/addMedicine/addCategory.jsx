import { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";


const Category = ({showCategory,user}) => {
  const [categoryName,setCategoryName]=useState("");
  const [categoryDescription,setCategoryDescription]=useState("");

  const handleCategory = async(e) =>{
    e.preventDefault();
    let obj = Object.create(Object.getPrototypeOf(user.medicines), Object.getOwnPropertyDescriptors(user.medicines));
    await obj.addCategory(categoryName,categoryDescription);
    user.setMedicines(obj);
    showCategory.onClosing(false);
  }

  return (
    <Form onSubmit={handleCategory}>
      <Modal show={showCategory.show} onHide={showCategory.onClosing}>
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
          <Button variant="secondary" onClick={()=>showCategory.onClosing(false)}>
            Close
          </Button>
          <Button className="btn btn-add" type="submit" onClick={handleCategory}>
            Update
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
};

export default Category;
