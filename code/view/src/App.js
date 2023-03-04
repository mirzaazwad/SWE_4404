import Landing from "./Components/LogRegister/Landing";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
      <div className="content">
        <Routes>
          <Route path='/' element={<Landing/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
