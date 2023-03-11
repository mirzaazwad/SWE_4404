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
  },[dispatch])
  const login=useSelector((state) => state.userState.loginSignUp);
  return ( 
    <div className="LoginSignUp">
      {(login===0 && <Login/>)||(login===1 && <SignUp/>)}
    </div>
   );
}
 
export default LoginSignUp;