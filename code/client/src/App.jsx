import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './index.css';
import CustomerRoutes from "./CustomerRoutes";
import SellerRoutes from "./SellerRoutes";
import DeliveryRoutes from "./DeliveryRoutes";
import GeneralRoutes from "./General";
import Error400 from "./Components/errors/error400";
import { useToken } from "./Hooks/useToken";

const App=()=> {
  const user=useToken();
  console.log(user);
  return (
      <Router>
        <div className="App">
          <div className="content">
            {user && user.verified && user.userType==="buyer" && (<CustomerRoutes/>)}
            {user && user.verified && user.userType==="seller" && (<SellerRoutes/>)}
            {user && user.verified && user.userType==="delivery" && (<DeliveryRoutes/>)}
            {(!user && (<GeneralRoutes user={user}/>)) || (user && !user.verified && (<GeneralRoutes user={user}/>)) }
            <Routes>
            <Route path="/error400" element={<Error400/>} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
