import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { BuyerContextProvider } from "./Contexts/Profile/buyer/buyerContext";

function App() {
  return (
    <Router>
      <div className="App">
      <div className="content">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route exact path='/profileBuyer/:id' element={
          <BuyerContextProvider>
          <ProfilePageForCustomers/>
          </BuyerContextProvider>
          }/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;