import NavScrollExample from "./components/navbar"
import ProfileFormPharmacy from './components/profileFormPharmacy';

function App() {
  return (
    <div>
    <NavScrollExample />

    <section>
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100 mx-auto my-5 w-100">
        <div className="profile-form-outer w-50 mt-5">
          <ProfileFormPharmacy />
        </div>
      </div>
    </div>
    
    </section>
          
    </div>
  );
}

export default App;
