import NavbarCustomer from "../partials/profile/navbarCustomer";
import ProfileFormCustomer from './profileFormCustomer';
import ProfilePicture from './profilePictureBox';
import { useEffect, useState } from 'react';
import { useSocket } from '../../Hooks/useSocket';
import { useToken } from '../../Hooks/useToken';
import Loader from "../partials/loader";
import buyerUser from "../../Library/User/buyer";

const  ProfilePageForCustomers = () => {
  const user = useToken();
  const socket=useSocket(user._id,[]);
  const [isLoading, setIsLoading] = useState(true);
  const [buyer, setBuyer] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      const buyer = new buyerUser(user._id, user.token, user.googleId);
      await buyer.retrieveUserInformation();
      setBuyer(buyer);
      setIsLoading(false);
    };
    fetchUserInformation();
  }, [user]);
    if(!isLoading){
      return (     
        <div>
          <NavbarCustomer/>
          <section>
          <div className="container h-100">
            <div className="pt-5">
          <div className="mt-5 d-lg-none d-flex justify-content-center"><ProfilePicture user={buyer}/></div></div>
            <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
            <div className="my-3 d-none d-lg-flex"><ProfilePicture user={buyer}/></div>
              <div className="profile-form-outer w-50 mt-5">
                <ProfileFormCustomer socket={socket} user={buyer}/>
              </div>
            </div>
          </div>
          </section>  
          </div>
        );
    }
    else{
      <Loader/>
    }
  }
   
  export default  ProfilePageForCustomers;

