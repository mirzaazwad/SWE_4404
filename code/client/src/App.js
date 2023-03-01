import NavbarCustomer from './components/navbarCustomer';
import ProfileFormCustomer from './components/profileFormCustomer';
import NavbarPharmacy from './components/navbarPharmacy';
import ProfilePicture from './components/profilePictureBox';
function App() {
  return (
    <div>
    <NavbarCustomer />

    <section>
    <div className="container h-100">
      <div className="pt-5">
    <div className="mt-5 d-lg-none d-flex justify-content-center"><ProfilePicture/></div></div>
      <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
      <div className="my-3 d-none d-lg-flex"><ProfilePicture/></div>
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
