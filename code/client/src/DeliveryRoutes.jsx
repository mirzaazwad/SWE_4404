import { Route, Routes } from "react-router-dom";
import ChangePassword from "./Components/profile/changePassword";
import ProfilePageForDelivery from "./Components/profile/profilePageDelivery";
import Error404 from "./Components/errors/error404";
import DeliveryRequest from "./Components/deliveryRequests/deliveryRequest";

const DeliveryRoutes = () => {
  return (
    <Routes>
      <Route
        exact
        path="/profileDelivery"
        element={<ProfilePageForDelivery />}
      />
      <Route
        exact
        path="/profileDelivery/changePassword"
        element={<ChangePassword />}
      />
      <Route
        exact
        path="/deliveries"
        element={<DeliveryRequest/>}
      />
      <Route path="*" element={<Error404/>}></Route>
    </Routes>
  );
};

export default DeliveryRoutes;
