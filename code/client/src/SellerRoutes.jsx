import {
  Route,
  Routes,
} from "react-router-dom";
import ProfilePageForPharmacy from "./Components/profile/profilePageForPharmacy";
import ChangePassword from "./Components/profile/changePassword";
import AddMedicine from "./Components/inventoryManagementSystem/addMedicine/addMedicine";
import Inventory from "./Components/inventoryManagementSystem/inventory";
import ChatPage from "./Components/chat/chatRoom";
import IncomingOrdersCard from "./Components/inventoryManagementSystem/pharmacyOrders/incomingOrders";
import PharmacyOrderDetails from "./Components/inventoryManagementSystem/pharmacyOrders/pharmacyOrderDetails";
import Account from "./Components/accounts/account";

import Error404 from "./Components/errors/error404";

import CreateOrder from "./Components/inventoryManagementSystem/pharmacyOrders/createOrder";

const SellerRoutes = () => {
  return (
    <Routes>
      <Route exact path="/profileSeller" element={<ProfilePageForPharmacy />} />
      <Route exact path="/profileSeller/chats" element={<ChatPage />} />
      <Route
        exact
        path="/profileSeller/changePassword"
        element={<ChangePassword />}
      />
      <Route
        exact
        path="/inventoryManagementSystem/inventory"
        element={<Inventory />}
      />
      <Route
        exact
        path="/inventoryManagementSystem/addMedicine"
        element={<AddMedicine />}
      />
      <Route exact path="/account" element={<Account />} />
      <Route exact path="/incomingOrders" element={<IncomingOrdersCard />} />
      <Route
        exact
        path="/getOrderDetails/:userId/:orderId"
        element={<PharmacyOrderDetails />}
      />
      <Route
        exact
        path="/createOrder/:customerId/:orderId"
        element={<CreateOrder />}
      />
      <Route path="*" element={<Error404/>}></Route>
    </Routes>
  );
};

export default SellerRoutes;
