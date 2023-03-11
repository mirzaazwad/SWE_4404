import Login from "./Login";
import SignUp from "./SignUp";
import {useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LOGIN } from "../../Contexts/action";


const LoginSignUp = () => {
  const dispatch=useDispatch();
  useEffect(()=>{
    const user=JSON.parse(localStorage.getItem('user'));
    if(user){
      dispatch(LOGIN(user));
    }
  },[])
  const login=useSelector((state) => state.userState.loginSignUp);
  const user = useSelector((state) => state.userState.user);
  if(user){
    if(user.userType==='buyer'){
      return window.location.href='/profileBuyer/'+user._id;
    }
    else{
      return window.location.href='/profileSeller/'+user._id;
    }
  }
  return ( 
    <div className="LoginSignUp">
      {(login===0 && <Login/>)||(login===1 && <SignUp/>)}
    </div>
   );
}
 
export default LoginSignUp;