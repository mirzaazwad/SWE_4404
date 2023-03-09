import Landing from "./Components/LogRegister/Landing";
import ProfilePageForCustomers from "./Components/profile/profilePageForCustomers";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./Contexts/Profile/buyer/store";

function App() {
  return (
    <Router>
      <div className="App">
      <div className="content">
        <Routes>
          <Route path='/' element={<Landing />} />
          <Route exact path='/profileBuyer/:id' element={
            <Provider store={store}>
          <ProfilePageForCustomers/>
            </Provider>
          }/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;