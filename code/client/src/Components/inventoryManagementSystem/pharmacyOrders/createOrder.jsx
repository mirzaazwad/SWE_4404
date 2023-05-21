import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavbarPharmacy from "../../partials/profile/navbarPharmacy";
import { useToken } from "../../../Hooks/useToken";
import { useDispatch, useSelector } from "react-redux";
import {
  addItem,
  updateItem,
  clearItems,
  removeItem,
} from "../../../Contexts/pharmacyCartAction.js";
import { useParams } from "react-router-dom";
import { Pagination } from "react-bootstrap";
import { Table, Button, Modal } from "react-bootstrap";
import Loader from "../../partials/loader";

const CreateOrder = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [totalPrice, setTotalPrice] = useState(0);
  const user = useToken();
  const navigate=useNavigate();
  const { customerId, orderId } = useParams();
  const [medicines, setMedicines] = useState(null);
  const [medicine, setMedicine] = useState({});
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.pharmacyCartState) || [];
  const cardsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [loaded, setLoaded] = useState(false);
  const [stripsValue, setStripsValue] = useState(0);
  const [piecesValue, setPiecesValue] = useState(0);
  const [boxesValue, setBoxesValue] = useState(0);
  const [medicineValues, setMedicineValues] = useState([]);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`/api/pharmacy/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? "google" : "email",
        },
      });
      setMedicines(response.data);
      if (response.data) setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    dispatch(clearItems());
    fetchMedicines();
  }, []);

  const indexOfLastCard = currentPage * cardsPerPage;
  const indexOfFirstCard = indexOfLastCard - cardsPerPage;
  const currentCards = medicines
    ? medicines.slice(indexOfFirstCard, indexOfLastCard)
    : null;

  // Handle page number click
  const handlePageClick = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Handle "First" page click
  const handleFirstPageClick = () => {
    setCurrentPage(1);
  };

  // Handle "Previous" page click
  const handlePrevPageClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Handle "Next" page click
  const handleNextPageClick = () => {
    if (
      currentPage < Math.ceil((medicines ? medicines.length : 0) / cardsPerPage)
    ) {
      setCurrentPage(currentPage + 1);
    }
  };

  // Handle "Last" page click
  const handleLastPageClick = () => {
    setCurrentPage(
      Math.ceil((medicines ? medicines.length : 0) / cardsPerPage)
    );
  };

  // Generate the page numbers
  const pageNumbers = [];
  for (
    let i = 1;
    i <= Math.ceil((medicines ? medicines.length : 0) / cardsPerPage);
    i++
  ) {
    pageNumbers.push(i);
  }
  const handleOrderApproval = async () => {
    try {
      await axios.patch(`http://localhost:4000/api/order/approveOrder/${user._id}/${orderId}`, {status:"Approved"}, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? 'google' : 'email',
        },
      });
      // Handle any additional logic or UI updates after order approval
    } catch (error) {
      console.error(error);
      // Handle error response or display error message to the user
    }
  };
  const handleCreatedOrderApproval = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:4000/api/order/approveCreatedOrder/${customerId}/${orderId}`,
        { medicines: cart, pharmacyManagerId: user._id },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            idType: user.googleId ? 'google' : 'email',
          },
        }
      );
      console.log(response);
  
      // The axios request is completed, now proceed with handleOrderApproval() and navigation
      handleOrderApproval();
      navigate(`/getOrderDetails/${user._id}/${orderId}`);
      // Handle any additional logic or UI updates after order approval
    } catch (error) {
      console.error(error);
      // Handle error response or display error message to the user
    }
  
    await dispatch(clearItems());
  };
  
  const handleAddToCart = async (
    medicineId,
    stripsValue,
    piecesValue,
    boxesValue
  ) => {
    if(stripsValue === undefined){
      stripsValue = 0;
    }
    if(piecesValue === undefined){
      piecesValue = 0;
    }
    if(boxesValue === undefined){
      boxesValue = 0;
    }
    if (stripsValue + piecesValue + boxesValue <= 0) {
      alert("Please enter a valid quantity");
      return;
    }
    const fetchMedicine = async (medicineId) => {
      try {
        const response = await axios.get(
          `/api/pharmacy/${user._id}/medicine/${medicineId}`,
          {
            headers: {
              Authorization: `Bearer ${user.token}`,
              idType: user.googleId ? "google" : "email",
            },
          }
        );
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    };
    const medicine = await fetchMedicine(medicineId);
  
    if (!medicine) {
      console.log("Failed to fetch medicine");
      return;
    }
    console.log(stripsValue, piecesValue, boxesValue);

    const calculatePrice = (stripsValue, piecesValue, boxesValue) => {
      let pcsPrice = 0,
        stripsPrice = 0,
        boxesPrice = 0;
        
      if (!medicine) {
        return 0; // Or any appropriate default value if stock information is not available
      }
      if (medicine.Stock.Strips != null) {
        pcsPrice =
          (medicine.SellingPrice * piecesValue) /
          (medicine.PcsPerStrip * medicine.StripsPerBox);
          console.log(pcsPrice);
        stripsPrice =
          (medicine.SellingPrice * stripsValue) / medicine.StripsPerBox;
        boxesPrice = medicine.SellingPrice * boxesValue;
      } else {
        pcsPrice = (medicine.SellingPrice * piecesValue) / medicine.PcsPerBox;
        boxesPrice = medicine.SellingPrice * boxesValue;
        console.log(pcsPrice);
      }
      
      var totalPrice = pcsPrice + stripsPrice + boxesPrice;
      var truncatedPrice = Math.round(totalPrice);
      return truncatedPrice;
    };
    
    const price = calculatePrice(stripsValue, piecesValue, boxesValue);
     
    setTotalPrice(totalPrice + price);
  
    let found = false;
  
    for (const item of cart) {
      if (item.medicineId === medicineId && item.id === customerId) {
        found = true;
        break;
      }
    }
  
    if (
      medicine.Stock.Pcs < piecesValue ||
      medicine.Stock.Strips < stripsValue ||
      medicine.Stock.Boxes < boxesValue
    ) {
      return alert("Not enough quantity in stock");
    }
  
    const updateCartItem = async () => {
      const { Stock, ...medicineWithoutStock } = medicine;
      try {
        await dispatch(
          updateItem({
            ...medicineWithoutStock,
            id: customerId,
            medicineId: medicineId,
            quantityPcs: piecesValue,
            quantityStrips: stripsValue,
            quantityBoxes: boxesValue,
            price: price, // Use the updatedPrice here
            prescriptionImage: "",
          })
        );
      } catch (error) {
        console.log("Error updating cart item:", error);
      }
    };
  
    const addItemToCart = async () => {
      const { Stock, ...medicineWithoutStock } = medicine;
      try {
        await dispatch(
          addItem({
            ...medicineWithoutStock,
            id: customerId,
            medicineId: medicineId,
            quantityPcs: piecesValue,
            quantityStrips: stripsValue,
            quantityBoxes: boxesValue,
            price: price, // Use the updatedPrice here
          })
        );
      } catch (error) {
        console.log("Error adding item to cart:", error);
      }
    };
  
    if (found) {
      try {
        await updateCartItem();
      } catch (error) {
        console.log("Error updating cart item:", error);
      }
    } else {
      try {
        await addItemToCart();
      } catch (error) {
        console.log("Error adding item to cart:", error);
      }
    }
  };
  
  if (!loaded) {
    return <Loader />;
  }
  const handleMedicineInputChange = (medicineIndex, field, value) => {
    setMedicineValues((prevValues) => {
      const updatedValues = [...prevValues];
      updatedValues[medicineIndex] = {
        ...updatedValues[medicineIndex],
        [field]: value,
      };
      return updatedValues;
    });
  };
  return (
    <div>
      <NavbarPharmacy user={user} />

      <section>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Items</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {cart.length===0 &&
            <div className="d-flex flex-column justify-content-center">
              <div
                className="mt-5 w-100 text-center fs-3"
                style={{ color: "red" }}
              >
                No item selected
              </div>
              <div className="d-flex justify-content-center">
                <i className="bx bxs-cart-add" style={{ fontSize: "20rem" }}></i>
              </div>
            </div>
}
          {cart.length!==0 &&
            <div>
              <div className="container cart-table">
                <div>
                  <h2 style={{ textAlign: "center", color: "#EB006F" }}>
                    My Cart
                  </h2>
                </div>
                <Table striped bordered hover responsive>
                  <thead>
                    <tr style={{ textAlign: "center" }}>
                      <th>#</th>
                      <th>Name</th>
                      <th>Pcs</th>
                      <th>Strips</th>
                      <th>Boxes</th>
                      <th>Price</th>
                      
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((medicine, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{medicine.MedicineName}</td>
                        <td>{medicine.quantityPcs}</td>
                        <td>{medicine.quantityStrips}</td>
                        <td>{medicine.quantityBoxes}</td>
                        <td>{medicine.price}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <div className="d-flex justify-content-end">              
                  <div>
                    <h4 style={{ color: "red" }}>Total Price: ৳{totalPrice}</h4>
                  </div>
                </div>
              </div>
            </div>
}
          </Modal.Body>
          <Modal.Footer>
            <div className="d-flex justify-content-end">

            <Button variant="secondary" className="float-end me-2" onClick={handleClose}>
              Close
            </Button>
            <Button className="btn btn-approve-order float-end" onClick={handleCreatedOrderApproval}>
              Approve
            </Button>
            </div>
          </Modal.Footer>
        </Modal>
        <div className="container-fluid pharmacy-container">
          <div>
            <button className="btn btn-add" onClick={handleShow}>
              Added items: {cart.length}
            </button>
          </div>
          <h4 style={{ color: "#EB006F", textAlign: "center" }}>
            <p> Medicine List </p>
          </h4>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th className="text-center">Name</th>
                <th className="text-center">Generic Name</th>
                <th className="text-center">Strips</th>
                <th className="text-center">Pieces</th>
                <th className="text-center">Boxes</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentCards.map((medicine, index) => {
                const medicineState = medicineValues[index] || {
                  stripsValue: 0,
                  piecesValue: 0,
                  boxesValue: 0,
                };
                return (
                  <tr key={medicine._id}>
                    <td className="text-center">{medicine.MedicineName}</td>
                    <td className="text-center">{medicine.GenericName}</td>
                    <td className="text-center">
                      {medicine.Stock && medicine.Type.hasStrips && (
                        <input
                          type="number"
                          value={medicineState.stripsValue}
                          max={medicine.Stock.Strips || 0}
                          min={0}
                          onChange={(e) =>
                            handleMedicineInputChange(
                              index,
                              "stripsValue",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      )}
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        value={medicineState.piecesValue}
                        max={medicine.Stock.Pcs || 0}
                        min={0}
                        onChange={(e) =>
                          handleMedicineInputChange(
                            index,
                            "piecesValue",
                            parseInt(e.target.value)
                          )
                        }
                      />
                    </td>
                    <td className="text-center">
                      {medicine.Stock && medicine.Stock.Boxes !== null && (
                        <input
                          type="number"
                          value={medicineState.boxesValue}
                          max={medicine.Stock.Boxes || 0}
                          min={0}
                          onChange={(e) =>
                            handleMedicineInputChange(
                              index,
                              "boxesValue",
                              parseInt(e.target.value)
                            )
                          }
                        />
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        className="btn btn-add m-auto"
                        onClick={() =>
                          handleAddToCart(
                            medicine._id,
                            medicineState.stripsValue,
                            medicineState.piecesValue,
                            medicineState.boxesValue
                          )
                        }
                      >
                        Add
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>

          {!medicines && <Loader />}
          <div className="d-flex justify-content-center mt-0">
            <Pagination>
              <Pagination.First onClick={handleFirstPageClick} />
              <Pagination.Prev onClick={handlePrevPageClick} />
              {currentPage >= 3 && (
                <>
                  <Pagination.Ellipsis />
                  <Pagination.Item
                    onClick={() => handlePageClick(currentPage - 2)}
                  >
                    {currentPage - 2}
                  </Pagination.Item>
                </>
              )}
              {currentPage >= 2 && (
                <Pagination.Item
                  onClick={() => handlePageClick(currentPage - 1)}
                >
                  {currentPage - 1}
                </Pagination.Item>
              )}
              <Pagination.Item active>{currentPage}</Pagination.Item>
              {currentPage < pageNumbers.length - 1 && (
                <Pagination.Item
                  onClick={() => handlePageClick(currentPage + 1)}
                >
                  {currentPage + 1}
                </Pagination.Item>
              )}
              {currentPage < pageNumbers.length - 2 && (
                <>
                  <Pagination.Item
                    onClick={() => handlePageClick(currentPage + 2)}
                  >
                    {currentPage + 2}
                  </Pagination.Item>
                  <Pagination.Ellipsis />
                </>
              )}
              <Pagination.Next onClick={handleNextPageClick} />
              <Pagination.Last onClick={handleLastPageClick} />
            </Pagination>
          </div>
        </div>
      </section>
    </div>
  );
};
export default CreateOrder;
