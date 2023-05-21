import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import ProfileFormPharmacy from './profileFormPharmacy';
import ProfilePicture from './profilePictureBox';
import { useEffect, useState} from 'react';
import { useSocket } from '../../Hooks/useSocket';
import { useToken } from '../../Hooks/useToken';
import pharmacyManager from '../../Library/User/pharmacy-manager';
import Loader from "../partials/loader";

const  ProfilePageForPharmacy = () => {
  const user = useToken();
  const socket=useSocket(user._id,[]);
  const [isLoading, setIsLoading] = useState(true);
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    const fetchUserInformation = async () => {
      const seller = new pharmacyManager(user._id, user.token, user.googleId);
      await seller.retrieveUserInformation();
      setSeller(seller);
      setIsLoading(false);
    };
    fetchUserInformation();
  }, [user]);

  if(!isLoading){
    return (     
      <div>
        <NavbarPharmacy/>
        <section>
        <div className="container h-100">
          <div className="pt-5">
        <div className="mt-5 d-lg-none d-flex justify-content-center"><ProfilePicture user={seller}/></div>
        </div>
          <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
          <div className="my-3 d-none d-lg-flex"><ProfilePicture user={seller}/></div>
            <div className="profile-form-outer w-50 mt-5">
              <ProfileFormPharmacy socket={socket} user={seller}/>
            </div>
          </div>
        </div>
        </section>
        </div>
      );
  }
  else{
    return (
      <Loader/>
    )
  }
}
 
export default  ProfilePageForPharmacy;
