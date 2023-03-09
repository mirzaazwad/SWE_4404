import Login from "./Login";
import SignUp from "./SignUp";
import {useSelector } from "react-redux";


const LoginSignUp = () => {
  const login=useSelector((state) => state.loginState.value);
  return ( 
    <div className="LoginSignUp">
      {(login===0 && <Login/>)||(login===1 && <SignUp/>)}
    </div>
   );
}
 
export default LoginSignUp;