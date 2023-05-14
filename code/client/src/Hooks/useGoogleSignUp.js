import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { LOGIN } from "../Contexts/action";
import { useDispatch } from "react-redux";

export const useGoogleSignUp = (userType) =>{
  const [error,setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const dispatch = useDispatch();
  const googleSignUp=useGoogleLogin({
    onSuccess: async ({ code }) => {
      await axios.post('/api/auth/google', {
        code,
        userType:userType,
        operation:'signup'
      }).then(async(result)=>{
        console.log(result.data);
        const user={_id:result.data.result.user._id,email:result.data.userInfo.email,userType:result.data.result.hasOwnProperty('buyer')?'buyer':'seller',token:result.data.tokens.id_token,verified:result.data.userInfo.email_verified,googleId:result.data.userInfo.sub};
        dispatch(LOGIN({_id:user._id,userType:user.userType,token:user.token,verified:user.verified,googleId:user.googleId}));
        localStorage.setItem('user',JSON.stringify({_id:user._id,userType:user.userType,token:user.token,verified:user.verified,googleId:user.googleId}));
        console.log(user);
        console.log(user);
        setisLoading(false);
      }).catch((error)=>{
        setError(error.message);
      })
    },
    flow: 'auth-code',
  }
  );

  return {googleSignUp,error,isLoading};
}