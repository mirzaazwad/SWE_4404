import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import ProfilePageForPharmacy from "./Components/profile/profilePageForPharmacy";
import ChangePassword from "./Components/profile/changePassword";
import ForgotPassword from "./Components/LogRegister/forgotPassword";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { storeBuyer } from "./Contexts/Profile/buyer/store";
import { storeSeller } from "./Contexts/Profile/seller/store";



function App() {
  return (
    <Router>
      <div className="App">
      <div className="content">
        <Routes>
          <Route path='/' element={<Landing />} />

          <Route exact path='/profileBuyer/:id' element={

          
           <Provider store={storeBuyer}>
          <ProfilePageForCustomers/>
            </Provider>
         
          }/>

          <Route path='/changePassword/:id' element={<ChangePassword/>} />
          <Route path='/forgotPassword' element={<ForgotPassword/>} />
        <Route exact path='/profileSeller/:id' element={

          
        <Provider store={storeSeller}>
        <ProfilePageForPharmacy/>
 </Provider>

}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;