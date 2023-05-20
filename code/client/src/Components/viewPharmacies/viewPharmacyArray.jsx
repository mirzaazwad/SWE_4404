import { Link } from "react-router-dom";
import PharmacyCard from "./pharmacyCard";
import Pagination from "react-bootstrap/Pagination";
import { useState } from "react";

const PharmacyArray = ({ pharmacies }) => {
  const itemsPerPage = 8; // Number of items per page
  const totalPages = Math.ceil(pharmacies.length / itemsPerPage); // Total number of pages
  const [currentPage, setCurrentPage] = useState(1); // Current active page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedPharmacies = pharmacies.slice(startIndex, endIndex);

  return (
    <div>
      <div className="row">
        {pharmacies &&
          displayedPharmacies.map((pharmacy) => (
            <div
              className="col-xs-6 col-sm-6 col-md-3 col-lg-2 mx-5 my-4"
              key={pharmacy.id}
            >
              <Link
                to={`/Pharmacy/${pharmacy._id}`}
                style={{ textDecoration: "none", color: "white" }}
              >
                <PharmacyCard
                  name={pharmacy.pharmacy}
                  location={pharmacy.address}
                  image={pharmacy.imageURL}
                  color={"#EB006F"}
                />
              </Link>
            </div>
          ))}
      </div>
      <div className="d-flex justify-content-center mt-3">
        <Pagination>
          <Pagination.First
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          />
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {Array.from({ length: totalPages }).map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={currentPage === index + 1}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
          <Pagination.Last
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      </div>
    </div>
  );
};

export default PharmacyArray;
