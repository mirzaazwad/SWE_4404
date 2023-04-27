import { useParams } from 'react-router-dom';

import NavbarCustomer from "../partials/profile/navbarCustomer";

import ProfileFormCustomer from './profileFormCustomer';
import ProfilePicture from './profilePictureBox';
import axios from 'axios';
import { useEffect } from 'react';
import {useDispatch, useSelector } from 'react-redux';
import { setBuyerUser } from '../../Contexts/action';
import CollapsibleChat from '../Chat/collapsableChat';

const  ProfilePageForCustomers = () => {
  const user = useSelector((state)=>state.userState.user);
  const {id}=useParams();
  const dispatch=useDispatch();
  useEffect(()=>{
    const retrieveUser = async() =>{
      await axios.get('/api/profile/user/getUser/'+id,{
        headers:{'Authorization': `Bearer ${user.token}`}
      }).then((result)=>{
        dispatch(setBuyerUser(result.data));
      })
    };
    retrieveUser();
  },[])
  console.log(id+"6411760cc1e404df5e624ef8");
  return (     
    <div>
      <NavbarCustomer id={id}/>
  
      <section>
      <CollapsibleChat senderID={"6411760cc1e404df5e624ef8"} receiverID={id}  JWT={user}></CollapsibleChat>
      <div className="container h-100">
        <div className="pt-5">
      <div className="mt-5 d-lg-none d-flex justify-content-center"><ProfilePicture id={id}/></div></div>
        <div className="d-flex justify-content-around h-100 mx-auto my-5 w-100" style={{alignItems : 'center'}}>
        <div className="my-3 d-none d-lg-flex"><ProfilePicture id={id}/></div>
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

