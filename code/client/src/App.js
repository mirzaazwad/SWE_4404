import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import ProfilePageForPharmacy from "./Components/profile/profilePageForPharmacy";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <div className="content">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route exact path='/profileBuyer/:id' element={<ProfilePageForCustomers/>}/>
          <Route exact path='/profileSeller/:id' element={<ProfilePageForPharmacy/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;