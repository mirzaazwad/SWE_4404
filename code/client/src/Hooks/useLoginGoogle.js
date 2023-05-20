import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { LOGIN } from "../Contexts/action";
import { useDispatch } from "react-redux";

export const useLoginGoogle = () =>{
  const [errorGoogle,setError] = useState(null);
  const [isLoadingGoogle, setisLoading] = useState(null);
  const dispatch = useDispatch();
  const googleLogin=useGoogleLogin({
    onSuccess: async ({ code }) => {
      setisLoading(true);
      await axios.post('/api/auth/google', {
        code,
        operation:'login'
      }).then(async(result)=>{
        const user={_id:result.data.result._id,email:result.data.userInfo.email,userType:result.data.result.userType,token:result.data.tokens.id_token,verified:result.data.userInfo.email_verified,googleId:result.data.userInfo.sub};
        console.log(user);
        dispatch(LOGIN({_id:user._id,userType:user.userType,token:user.token,verified:user.verified,googleId:user.googleId}));
        localStorage.setItem('user',JSON.stringify({_id:user._id,userType:user.userType,token:user.token,verified:user.verified,googleId:user.googleId}));
        setisLoading(false);
      }).catch((error)=>{
        setisLoading(false);
        setError("Google Login Failed");
      })
    },
    flow: 'auth-code',
  }
  );

  return {googleLogin,errorGoogle,isLoadingGoogle};
}