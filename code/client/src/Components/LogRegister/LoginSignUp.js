import Login from "./Login";
import SignUp from "./SignUp";
import {useSelector } from "react-redux";
import PhoneNumber from "./SignUpPhone";


const LoginSignUp = () => {
  const login=useSelector((state) => state.loginState.value);
  return ( 
    <div className="LoginSignUp">
      {(login===0 && <Login/>)||(login===1 && <SignUp/>)||(login===2 && <PhoneNumber/>)}
    </div>
   );
}
 
export default LoginSignUp;