import { useParams } from 'react-router-dom';
import NavbarPharmacy from './navbarPharmacy';
import ProfileFormPharmacy from './profileFormPharmacy';
import ProfilePicture from './profilePictureBox';
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useDispatch } from 'react-redux';
import { setSellerUser } from '../../Contexts/action';

const  ProfilePageForPharmacy = () => {
  const {id}=useParams();
  const dispatch=useDispatch();
  const [user,setUser]=useState(null);
  const retrieveUser = async() =>{
    await axios.get('/api/profile/user/'+id).then((result)=>{
      dispatch(setSellerUser(result.data));
      setUser(...result.data);
    })
    .catch(error=>console.log(error));
    await axios.get('/api/profile/buyer/'+user.email).then((result)=>{
      dispatch(setSellerUser({user,...result.data}));
    })
    .catch(error=>console.log(error));
    
  };
  useEffect(()=>{
    retrieveUser();
  },[])
  return (     
  <div>
    <NavbarPharmacy />

    <section>
    <div className="container h-100">
      <div className="pt-5">
    <div className="mt-5 d-lg-none d-flex justify-content-center"><ProfilePicture/></div></div>
      <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
      <div className="my-3 d-none d-lg-flex"><ProfilePicture/></div>
        <div className="profile-form-outer w-50 mt-5">
          <ProfileFormPharmacy id={id}/>
        </div>
      </div>
    </div>
    
    </section>
          
    </div>
  );
}
 
export default  ProfilePageForPharmacy;
