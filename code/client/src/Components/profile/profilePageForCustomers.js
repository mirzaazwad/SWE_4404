import { useParams } from 'react-router-dom';
import NavbarCustomer from './navbarCustomer';
import ProfileFormCustomer from './profileFormCustomer';
import ProfilePicture from './profilePictureBox';
import axios from 'axios';
import { useEffect } from 'react';
import {useDispatch } from 'react-redux';
import { store } from '../../Contexts/Profile/buyer/store';
import { setUser } from '../../Contexts/Profile/buyer/action';

const  ProfilePageForCustomers = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const retrieveUser = async() =>{
    await axios.get('/api/buyer/profile/'+id).then((result)=>{
      dispatch(setUser(result.data));
    })
    .catch(error=>console.log(error));
  };
  useEffect(()=>{
    retrieveUser();
  },[])
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
          <ProfileFormCustomer id={id}/>
        </div>
      </div>
    </div>
    </section>  
    </div>
  );
}
 
export default  ProfilePageForCustomers;

