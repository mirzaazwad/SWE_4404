import { Route, Routes } from "react-router-dom";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import ChangePassword from "./Components/profile/changePassword";
import ViewPharmacies from "./Components/viewPharmacies/viewAllPharmacies";
import Pharmacy from "./Components/viewPharmacies/medicinesOfPharmacy";
import Medicine from "./Components/viewPharmacies/medicineDetails";
import MyOrders from "./Components/cartManagementSystem/myOrders";
import CheckOutPage from "./Components/cartManagementSystem/checkOutPage";
import OrderDetailsCard from "./Components/cartManagementSystem/orderDetails";
import Prescription from "./Components/prescriptionManagement/prescription";
import ViewPrescription from "./Components/prescriptionManagement/viewPrescription";
import OrderByPrescription from "./Components/prescriptionManagement/orderByPrescription";



const CustomerRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path="/profileBuyer/changePassword"
        element={<ChangePassword />}
      />
      <Route exact path="/profileBuyer" element={<ProfilePageForCustomers />} />
      <Route exact path="/ViewPharmacies" element={<ViewPharmacies />} />
      <Route exact path="/Pharmacy/:id" element={<Pharmacy />} />
      <Route exact path="/pharmacy/medicine" element={<Medicine />} />
      <Route exact path="/myOrders" element={<MyOrders />} />
      <Route exact path="/checkOutPage" element={<CheckOutPage />} />
      <Route
        exact
        path="/orderDetails/:userId/:orderId"
        element={<OrderDetailsCard />}
      />
      <Route exact path="/prescription" element={<Prescription />} />
      <Route
        exact
        path="/orderByPrescription/:prop1/:prop2"
        element={<OrderByPrescription />}
      />
      <Route
        exact
        path="/viewPrescription/:prop1/:prop2/:prop3"
        element={<ViewPrescription />}
      />
      
      <Route path="*" element={<Error404/>}></Route>
    </Routes>
  );
};

export default CustomerRoutes;
