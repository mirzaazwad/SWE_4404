import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useState } from "react";
import { LOGIN } from "../Contexts/action";
import { useDispatch } from "react-redux";

export const useGoogleSignUp = (userType) =>{
  const [error,setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);
  const [googleLoginResult,setGoogleLoginResult] = useState(null);
  const dispatch = useDispatch();
  const googleSignUp=useGoogleLogin({
    onSuccess: async ({ code }) => {
      await axios.post('/api/auth/google', {
        code,
        userType:userType
      }).then((result=>{
        console.log(result.data);
        const user={_id:result.data.result.user._id,email:result.data.userInfo.email,userType:result.data.result.hasOwnProperty('buyer')?'buyer':'seller',token:result.data.tokens.id_token,verified:result.data.userInfo.email_verified,googleId:result.data.userInfo.sub};
        dispatch(LOGIN({user}));
        localStorage.setItem('user',JSON.stringify(user));
        console.log(user);
        setGoogleLoginResult(result.data);
        setisLoading(false);
      }))
    },
    flow: 'auth-code',
  });

  return {googleSignUp,error,isLoading};
}