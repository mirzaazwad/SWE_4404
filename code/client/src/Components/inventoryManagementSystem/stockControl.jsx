import { Button, Form, Modal } from "react-bootstrap";

const StockManagement = ({show,amount,medicines,setError,inventory,stock}) => {

  const addToStock = async(e) => {
    e.preventDefault();
    show.handleClose();
    let obj = Object.create(Object.getPrototypeOf(inventory.inventory), Object.getOwnPropertyDescriptors(inventory.inventory));
    await obj.addStock(medicines.current_ix,stock.stockType,amount.amount);
    inventory.setInventory(obj);
  };

  const subToStock = async(e) => {
    e.preventDefault();
    show.handleClose();
    try{
      let obj = Object.create(Object.getPrototypeOf(inventory.inventory), Object.getOwnPropertyDescriptors(inventory.inventory));
      await obj.subStock(medicines.current_ix,stock.stockType,amount.amount);
      inventory.setInventory(obj);
    }
    catch(error){
      setError(error.message);
    }
  };


  return ( 
  <Modal show={show.show} onHide={show.handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>
        {stock.type === "add" ? "Add to stock" : "Remove from stock"}
      </Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form>
        <Form.Label>Quantity Type:</Form.Label>
        <Form.Select
          aria-label="Default select example"
          onChange={(e) =>
            stock.setStockType(e.target.value)
          }
        >
          <option>Select quantity type</option>
          <option value="Pcs">Pcs</option>
          {medicines && medicines.medicineArray && medicines.medicineArray[medicines.current_ix] && medicines.medicineArray[medicines.current_ix].Type.hasStrips===true && (<option value="Strips">Strips</option>)}
          <option value="Boxes">Boxes</option>
        </Form.Select>
        <Form.Label>Quantity:</Form.Label>
        <Form.Control
          type="number"
          aria-label="Default"
          aria-describedby="inputGroup-sizing-default"
          placeholder="Enter amount"
          value={amount.amount}
          onChange={(e)=>amount.setAmount(e.target.value)}
          required
        />
      </Form>
    </Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={show.handleClose}>
        Close
      </Button>
      <Button className="btn btn-add" onClick={stock.option === "add" ? addToStock : subToStock}>
        Update
      </Button>
    </Modal.Footer>
  </Modal> 
  );
}
 
export default StockManagement;