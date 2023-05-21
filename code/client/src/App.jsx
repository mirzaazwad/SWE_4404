import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import './index.css';
import CustomerRoutes from "./CustomerRoutes";
import SellerRoutes from "./SellerRoutes";
import DeliveryRoutes from "./DeliveryRoutes";
import GeneralRoutes from "./General";
import Error400 from "./Components/errors/error400";
import { useToken } from "./Hooks/useToken";
import Error404 from "./Components/errors/error404";

const App=()=> {
  const user=useToken();
  return (
      <Router>
        <div className="App">
          <div className="content">
            {((user===null || user===undefined) && (<GeneralRoutes user={user}/>) || ((user===null || user===undefined) && user.verified===false) && (<GeneralRoutes user={user}/>)) }
            {user && user.verified && user.userType==="buyer" && (<CustomerRoutes/>)}
            {user && user.verified && user.userType==="seller" && (<SellerRoutes/>)}
            {user && user.verified && user.userType==="delivery" && (<DeliveryRoutes/>)}
            <Routes>
            <Route exact path="/error400" element={<Error400/>} />
            </Routes>
          </div>
        </div>
      </Router>
  );
}

export default App;
