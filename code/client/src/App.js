import NavbarCustomer from './components/navbarCustomer';
import ProfileFormCustomer from './components/profileFormCustomer';

function App() {
  return (
    <div>
    <NavbarCustomer />

    <section>
    <div className="container h-100">
      <div className="d-flex justify-content-center h-100 mx-auto my-5 w-100">
        <div className="profile-form-outer w-50 mt-5">
          <ProfileFormCustomer />
        </div>
      </div>
    </div>
    
    </section>
          
    </div>
  );
}

export default App;
