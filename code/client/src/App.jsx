import { useToken } from "./Hooks/useToken";
import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import ForgotPassword from "./Components/LogRegister/forgotPassword";
import EmailVerification from "./Components/LogRegister/verifyEmail";
import ProfilePageForPharmacy from "./Components/profile/profilePageForPharmacy";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import ChangePassword from "./Components/profile/changePassword";
import AddMedicine from "./Components/inventoryManagementSystem/addMedicine/addMedicine";
import Inventory from "./Components/inventoryManagementSystem/inventory";
import Error404 from "./Components/errors/error404";
import Error400 from "./Components/errors/error400";
import ViewPharmacies from "./Components/viewPharmacies/viewAllPharmacies";
import Pharmacy from "./Components/viewPharmacies/medicinesOfPharmacy";
import Medicine from "./Components/viewPharmacies/medicineDetails";
import MyOrders from "./Components/cartManagementSystem/myOrders";
import CheckOutPage from "./Components/cartManagementSystem/checkOutPage";
import ChatPage from "./Components/chat/chatRoom";
import OrderDetailsCard from "./Components/cartManagementSystem/orderDetails";
import "./index.css";
import Prescription from "./Components/prescriptionManagement/prescription";
import ViewPrescription from "./Components/prescriptionManagement/viewPrescription";
import OrderByPrescription from "./Components/prescriptionManagement/orderByPrescription";
import IncomingOrdersCard from "./Components/inventoryManagementSystem/pharmacyOrders/incomingOrders";
import PharmacyOrderDetails from "./Components/inventoryManagementSystem/pharmacyOrders/pharmacyOrderDetails";
import ProfilePageForDelivery from "./Components/profile/profilePageDelivery";
import DeliveryRequest from "./Components/deliveryRequests/deliveryRequest";
import OngoingDeliveries from "./Components/ongoingDeliveries/ongoingDeliveries";
import DeliveryHistory from "./Components/deliveryHistory/deliveryRequest";
import { useDispatch, useSelector } from "react-redux";
import { LOGIN } from "./Contexts/action";
import CreateOrder from "./Components/inventoryManagementSystem/pharmacyOrders/createOrder";


const App = () => {
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
                !user ? (<Landing data={"login"} />) : user.userType==="buyer" ? (<Navigate to={"/profileBuyer/"} />) : user.userType==="seller" ?(<Navigate to={"/profileSeller/"} />):(<Navigate to={"/profileDelivery/"} />)
              } />
            <Route
              exact
              path="/signup"
              element={
                !user ? (
                  <Landing data={"signup"} />
                ) : user.userType==="buyer" ? (<Navigate to={"/profileBuyer/"} />) : user.userType==="seller" ?(<Navigate to={"/profileSeller/"} />):(<Navigate to={"/profileDelivery/"}/>)
              }
            />
            <Route
              exact
              path="/profileBuyer"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <ProfilePageForCustomers />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/profileSeller"
              element={
                user && (user.userType !== "buyer" && user.userType!=="delivery") && user.verified === true ? (
                  <ProfilePageForPharmacy />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/profileDelivery"
              element={
                user &&
                user.userType === "delivery" &&
                user.verified === true ? (
                  <ProfilePageForDelivery />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/profileSeller/chats"
              element={
                user && user.verified === true ? (
                  <ChatPage />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/profileBuyer/changePassword"
              element={
                user && !user.googleId && user.verified === true ? (
                  <ChangePassword />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/profileSeller/changePassword"
              element={
                user && !user.googleId && user.verified === true ? (
                  <ChangePassword />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/forgotPassword"
              element={
                !user ? (
                  <ForgotPassword />
                ) : (user.userType!=="seller" && user.userType!=="delivery") ? (
                  <Navigate to={"/profileBuyer"} />
                ) : (
                  <Navigate to={"/profileSeller"} />
                )
              }
            />
            <Route
              exact
              path="/emailVerify/:email"
              element={
                !user || user.verified === false ? (
                  <EmailVerification />
                ) : (user.userType!=="seller" && user.userType!=="delivery") ? (
                  <Navigate to={"/profileBuyer"} />
                ) : (
                  <Navigate to={"/profileSeller/"} />
                )
              }
            />
            <Route
              exact
              path="/inventoryManagementSystem/inventory"
              element={
                user && (user.userType !== "buyer" && user.userType!=="delivery") && user.verified === true ? (
                  <Inventory />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/inventoryManagementSystem/addMedicine"
              element={
                user && (user.userType !== "buyer" && user.userType!=="delivery") && user.verified === true ? (
                  <AddMedicine />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/ViewPharmacies"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
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
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <Pharmacy />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/pharmacy/medicine"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <Medicine />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/myOrders"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <MyOrders />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/checkOutPage"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <CheckOutPage />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/orderDetails/:userId/:orderId"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <OrderDetailsCard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/prescription"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <Prescription />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/orderByPrescription/:prop1/:prop2"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <OrderByPrescription />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/viewPrescription/:prop1/:prop2/:prop3"
              element={
                user && (user.userType!=="seller" && user.userType!=="delivery") && user.verified === true ? (
                  <ViewPrescription />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/incomingOrders"
              element={
                user && (user.userType !== "buyer" && user.userType!=="delivery") && user.verified === true ? (
                  <IncomingOrdersCard />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
              exact
              path="/getOrderDetails/:userId/:orderId"
              element={
                user && (user.userType !== "buyer" && user.userType!=="delivery") && user.verified === true ? (
                  <PharmacyOrderDetails />
                ) : (
                  <Navigate to="/" />
                )
              }
            />
            <Route
        exact
        path="/createOrder/:customerId/:orderId"
        element={
          user && (user.userType !== "buyer" && user.userType!=="delivery") && user.verified === true ? (
            <CreateOrder />
          ) : (
            <Navigate to="/" />
          )
        }
      />
            <Route
              exact
              path="/profileDelivery"
              element={user && (user.userType !== "seller" && user.userType!=="buyer") && user.verified === true ?(<ProfilePageForDelivery />):<Navigate to='/'/>}
            />
            <Route
              exact
              path="/profileDelivery/changePassword"
              element={user && !user.googleId && user.verified === true ?<ChangePassword />:(
                <Navigate to="/" />
              )}
            />
            <Route exact path="/deliveries" element={user && (user.userType !== "seller" && user.userType!=="buyer") && user.verified === true ?<DeliveryRequest />:<Navigate to='/'/>} />
            <Route
              exact
              path="/ongoingDeliveries"
              element={user && (user.userType !== "seller" && user.userType!=="buyer") && user.verified === true ?<OngoingDeliveries />:<Navigate to='/'/>}
            />
            <Route
              exact
              path="/deliveryHistory"
              element={user && (user.userType !== "seller" && user.userType!=="buyer") && user.verified === true ?<DeliveryHistory />:<Navigate to='/'/>}
            />
            <Route path="/error500" element={<Error400 />} />
            <Route path="*" element={<Error404 />}></Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;