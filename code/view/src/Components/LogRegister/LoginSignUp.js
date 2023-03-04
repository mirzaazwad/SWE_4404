import Login from "./Login";
import SignUp from "./SignUp";
import {useSelector } from "react-redux";


const LoginSignUp = () => {
  const login=useSelector((state) => state.loginState.value);
  return ( 
    <div className="LoginSignUp">
      {(login && <Login/>)||(!login && <SignUp/>)}
    </div>
   );
}
 
export default LoginSignUp;