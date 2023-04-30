import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import ForgotPassword from "./Components/LogRegister/forgotPassword";
import EmailVerification from "./Components/LogRegister/verifyEmail";
import ProfilePageForPharmacy from "./Components/profile/profilePageForPharmacy";
import {BrowserRouter as Router, Navigate, Route, Routes,} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ChangePassword from "./Components/profile/changePassword";
import AddMedicine from "./Components/inventoryManagementSystem/addMedicine";
import Inventory from "./Components/inventoryManagementSystem/inventory";
import Error404 from "./Components/error404";
import { LOGIN } from "./Contexts/action";
import ViewPharmacies from "./Components/viewPharmacies/viewAllPharmacies";
import Pharmacy from "./Components/viewPharmacies/medicinesOfPharmacy";
import Medicine from "./Components/viewPharmacies/medicineDetails";
import {CartProvider} from './Contexts/cartAction.js';
import MyOrders from "./Components/cartManagementSystem/myOrders";
import CheckOutPage from "./Components/cartManagementSystem/checkOutPage";
import ChatPage from "./Components/Chat/chatRoom";
import OrderDetailsCard from "./Components/cartManagementSystem/orderDetails";
import './index.css';
import Prescription from "./Components/prescriptionManagement/prescription";

function App() {
  let user = useSelector((state) => state.userState.user);
  const dispatch = useDispatch();
  if (user === null) {
    user = JSON.parse(localStorage.getItem("user"));
    dispatch(LOGIN(user));
  }
  return (
      <Router>
        <div className="App">
          <div className="content">
            <Routes>
              <Route
                exact
                path="/"
                element={
                  !user ? (
                    <Landing data={"login"} />
                  ) : user.userType === "buyer" ? (
                    <Navigate to={"/profileBuyer/" + user._id} />
                  ) : (
                    <Navigate to={"/profileSeller/" + user._id} />
                  )
                }
              />
              <Route
                exact
                path="/signup"
                element={
                  !user ? (
                    <Landing data={"signup"} />
                  ) : user.userType === "buyer" ? (
                    <Navigate to={"/profileBuyer/" + user._id} />
                  ) : (
                    <Navigate to={"/profileSeller/" + user._id} />
                  )
                }
              />
              <Route
                exact
                path="/profileBuyer/:id"
                element={
                  user && user.verified === true ? (
                    <ProfilePageForCustomers />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                exact
                path="/profileSeller/:id"
                element={
                  user && user.verified === true ? (
                    <ProfilePageForPharmacy />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
          <Route exact path='/profileSeller/chats/:id' element={user  && user.verified===true?<ChatPage/>:<Navigate to='/'/>}/>
              <Route
                exact
                path="/profileBuyer/changePassword/:id"
                element={<ChangePassword />}
              />
              <Route
                exact
                path="/profileSeller/changePassword/:id"
                element={<ChangePassword />}
              />
              <Route
                exact
                path="/forgotPassword"
                element={
                  !user ? (
                    <ForgotPassword />
                  ) : user.userType === "buyer" ? (
                    <Navigate to={"/profileBuyer/" + user._id} />
                  ) : (
                    <Navigate to={"/profileSeller/" + user._id} />
                  )
                }
              />
              <Route
                exact
                path="/emailVerify/:email"
                element={
                  !user || user.verified === false ? (
                    <EmailVerification />
                  ) : user.userType === "buyer" ? (
                    <Navigate to={"/profileBuyer/" + user._id} />
                  ) : (
                    <Navigate to={"/profileSeller/" + user._id} />
                  )
                }
              />
              <Route
                exact
                path="/inventoryManagementSystem/inventory/:id"
                element={
                  user && user.verified === true ? (
                    <Inventory />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                exact
                path="/inventoryManagementSystem/addMedicine/:id"
                element={
                  user && user.verified === true ? (
                    <AddMedicine />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                exact
                path="/ViewPharmacies/:id"
                element={
                  user && user.verified === true ? (
                    <ViewPharmacies />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                exact
                path="/Pharmacy/:id"
                element={
                  user && user.verified === true ? (
                    <Pharmacy />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route
                exact
                path="pharmacy/:id/medicine/:medicineId"
                element={
                  user && user.verified === true ? (
                    <Medicine />
                  ) : (
                    <Navigate to="/" />
                  )
                }
              />
              <Route exact path="/myOrders" element={user && user.verified === true ? (<MyOrders />): (<Navigate to = "/"/>) }/>
              <Route exact path="/checkOutPage" element={user && user.verified === true ? (<CheckOutPage />): (<Navigate to = "/"/>) }/>
              <Route exact path="/orderDetails/:userId/:orderId" element={user && user.verified === true ? (<OrderDetailsCard />): (<Navigate to = "/"/>) }/>
              <Route exact path="/prescription" element={user && user.verified === true ? (<Prescription/>): (<Navigate to = "/"/>) }/>
              <Route path="*" element={<Error404 />}></Route>
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
