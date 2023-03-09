import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import ProfilePageForPharmacy from "./Components/profile/profilePageForPharmacy";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BuyerContextProvider } from "./Contexts/Profile/buyer/buyerContext";
import { SellerContextProvider } from "./Contexts/Profile/seller/sellerContext";

function App() {
  return (
    <Router>
      <div className="App">
      <div className="content">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route exact path='/profileBuyer/:id' element={
          <BuyerContextProvider>
          <ProfilePageForCustomers/>
          </BuyerContextProvider>
          }/>
          <Route exact path='/profileSeller/:id' element={
          <SellerContextProvider>
          <ProfilePageForPharmacy/>
          </SellerContextProvider>
          }/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;