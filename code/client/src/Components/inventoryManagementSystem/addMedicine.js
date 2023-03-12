import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { InputGroup, Form } from 'react-bootstrap';
import NavbarPharmacy from '../profile/navbarPharmacy';

function AddMedicine() {
  return (
    <div>
      <NavbarPharmacy />
      <section className='d-flex justify-content-center'>
        <Card className='addMedicineCard'>
          <Card.Header className='addMedicineCardHeader' style={{ fontSize: '20px' }}><b>Add Medicine</b></Card.Header>
          <Card.Title className='addMedicineCardTitle'>New Medicine Information: </Card.Title>
          <Card.Body>
            <div className='addMedicineSide d-flex justify-content-between'>
              <div className='w-100 me-2'>
                <InputGroup className="mb-1">
                  <InputGroup.Text className='required-field' id="inputGroup-sizing-default">
                    Medicine Name
                  </InputGroup.Text>
                  <Form.Control
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Enter medicine name' required
                  />
                </InputGroup>
              </div>
              <div className='addMedicineSide w-100 pl-2'>
                <InputGroup className="mb-1">
                  <InputGroup.Text className='required-field' id="inputGroup-sizing-default">
                    Generic Name
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Enter generic name of medicine' required
                  />
                </InputGroup>
              </div>
            </div>

            <br />
            <div className='addMedicineSide d-flex justify-content-between'>
              <div className='w-100 me-2'>
              <InputGroup className="mb-1">
              <InputGroup.Text className='required-field' id="inputGroup-sizing-default">
                Medicine Type
              </InputGroup.Text>
              <Form.Select aria-label="Select an option" placeholder="Select an option">
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Form.Select>
            </InputGroup>
              </div>
              <div className='addMedicineSide w-100 pl-2'>
              <InputGroup className="mb-1">
              <InputGroup.Text id="inputGroup-sizing-default">
                Category
              </InputGroup.Text>
              <Form.Select aria-label="Select an option" placeholder="Select an option">
        <option value="">Select an option</option>
        <option value="option1">Option 1</option>
        <option value="option2">Option 2</option>
        <option value="option3">Option 3</option>
      </Form.Select>
            </InputGroup>
              </div>
            </div>

            <br />
            <div className='addMedicineSide d-flex justify-content-between'>
              <div className='w-100 me-2'>
                <InputGroup className="mb-1">
                  <InputGroup.Text className='required-field' id="inputGroup-sizing-default">
                    Strips per box
                  </InputGroup.Text>
                  <Form.Control
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Enter amount' required
                  />
                </InputGroup>
              </div>
              <div className='addMedicineSide w-100 pl-2'>
                <InputGroup className="mb-1">
                  <InputGroup.Text className='required-field' id="inputGroup-sizing-default">
                    Manufacturer
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Enter manufacturer name' required
                  />
                </InputGroup>
              </div>
            </div>
            <br/>
            <div className='addMedicineSide d-flex justify-content-between  mb-2'>
              <div className='w-100 me-2'>
                <InputGroup className="mb-1">
                  <InputGroup.Text className='required-field' id="inputGroup-sizing-default">
                    Purchase Price
                  </InputGroup.Text>
                  <Form.Control
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Enter amount' required
                  />
                </InputGroup>
              </div>
              <div className='addMedicineSide w-100 pl-2'>
                <InputGroup className="mb-1">
                  <InputGroup.Text className='required-field' id="inputGroup-sizing-default">
                    Sell Price
                  </InputGroup.Text>
                  <Form.Control
                    aria-label="Default"
                    aria-describedby="inputGroup-sizing-default"
                    placeholder='Enter number' required
                  />
                </InputGroup>
              </div>
            </div>
            <br/>
            <InputGroup className="mb-4">
              <InputGroup.Text id="inputGroup-sizing-default">
                Description
              </InputGroup.Text>
              <Form.Control
                as="textarea"
                aria-describedby="inputGroup-sizing-default"
                placeholder='Add a description of the medicine, diagnosis, treatment, prevention of disease and side effects.'
              />
            </InputGroup>
            <div className='d-flex justify-content-center'>
        <Button className='btn btn-addMedicine w-25' variant="primary" type="submit">
          Add
        </Button>
        </div>
          </Card.Body>
        </Card>
      </section>
    </div>
  );
}

export default AddMedicine;
