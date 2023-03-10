import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import ProfilePageForPharmacy from "./Components/profile/profilePageForPharmacy";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { BuyerContextProvider } from "./Contexts/Profile/buyer/buyerContext";
import { SellerContextProvider } from "./Contexts/Profile/seller/sellerContext";
import { Provider } from "react-redux";
import { store } from "./Contexts/Profile/buyer/store";


function App() {
  return (
    <Router>
      <div className="App">
      <div className="content">
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route exact path='/profileBuyer/:id' element={

          
           <Provider store={store}>
          <ProfilePageForCustomers/>
            </Provider>
         
          }/>

          <Route exact path='/profileSeller/:id' element={
          
          <ProfilePageForPharmacy/>

          }/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;