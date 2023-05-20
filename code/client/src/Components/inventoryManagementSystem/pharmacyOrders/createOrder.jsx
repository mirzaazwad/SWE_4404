import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Card from "react-bootstrap/Card";
import NavbarPharmacy from "../../partials/profile/navbarPharmacy";
import { useToken } from "../../../Hooks/useToken";
import { Pagination } from "react-bootstrap";
import Loader from "../../partials/loader";

const CreateOrder = () => {
  const user = useToken();
  const [medicines, setMedicines] = useState(null);
  const cardsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const fetchMedicines = async () => {
    try {
      const response = await axios.get(`/api/pharmacy/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          idType: user.googleId ? "google" : "email",
        },
      });
      setMedicines(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
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

  return (
    <div>
      <NavbarPharmacy user={user} />

      <section>
        <div className="container-fluid pharmacy-container">
            <h4 style={{color:"#EB006F", textAlign:"center"}}>Medicine List</h4>
            {medicines &&
              currentCards.map((medicine) => (
                <div
                  className="mx-5"
                  key={medicine._id}
                >
                  <Card className="pharmacy-medicine-card mb-3 m-auto">
                    <Link
                      to={`/pharmacy/medicine?pid=${user._id}&mid=${medicine._id}`}
                      style={{ textDecoration: "none", color: "white" }}
                    >
                        <Card.Header className="pharmacy-medicine-card-header">

                        </Card.Header>
                      <Card.Body style={{color:"black"}}>
                        <Card.Text><b>{medicine.MedicineName}</b></Card.Text>
                        <Card.Text><b>{medicine.GenericName}</b></Card.Text>
                      </Card.Body>
                    </Link>
                  </Card>
                </div>
              ))}
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
