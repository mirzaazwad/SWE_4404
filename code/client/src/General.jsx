import {
  Route,
  Routes,
} from "react-router-dom";
import Landing from "./Components/LogRegister/Landing";
import ForgotPassword from "./Components/LogRegister/forgotPassword";
import EmailVerification from "./Components/LogRegister/verifyEmail";

const GeneralRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Landing data={"login"} />} />
      <Route exact path="/signup" element={<Landing data={"signup"} />} />
      <Route exact path="/forgotPassword" element={<ForgotPassword />} />
      <Route exact path="/emailVerify/:email" element={<EmailVerification />} />
    </Routes>
  );
};

export default GeneralRoutes;
