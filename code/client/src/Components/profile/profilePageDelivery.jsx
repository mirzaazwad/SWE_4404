import NavbarDelivery from "../partials/profile/navbarDelivery";
import ProfilePicture from './profilePictureBox';
import { useEffect, useState } from 'react';
import { useSocket } from '../../Hooks/useSocket';
import { useToken } from '../../Hooks/useToken';
import Loader from "../partials/loader";
import deliveryUser from "../../Library/User/delivery-man";
import ProfileFormDelivery from "./profileFormDelivery";

const  ProfilePageForDelivery = () => {
  const user = useToken();
  const socket=useSocket(user._id,[]);
  const [isLoading, setIsLoading] = useState(true);
  const [delivery, setDelivery] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      const delivery = new deliveryUser(user._id, user.token, user.googleId);
      await delivery.retrieveUserInformation();
      setDelivery(delivery);
      setIsLoading(false);
    };
    if(user){
      fetchUserInformation();
    }
  }, [user.googleId]);

    if(!isLoading){
      return (     
        <div>
          <NavbarDelivery/>
          <section>
          <div className="container h-100">
            <div className="pt-5">
          <div className="mt-5 d-lg-none d-flex justify-content-center"><ProfilePicture user={delivery}/></div></div>
            <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
            <div className="my-3 d-none d-lg-flex"><ProfilePicture user={delivery}/></div>
              <div className="profile-form-outer w-50 mt-5">
                <ProfileFormDelivery socket={socket} user={delivery}/>
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
   
  export default  ProfilePageForDelivery;

