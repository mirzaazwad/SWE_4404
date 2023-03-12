import axios from "axios";
import { useState } from "react";
import CryptoJS from "crypto-js";
import { useDispatch } from "react-redux";
import { LOGIN } from "../Contexts/action";

export const useLogin = () =>{
  const dispatch = useDispatch();
  const [error,setError] = useState(null);
  const [isLoading, setisLoading] = useState(null);

  const login = async (email,password) =>{
    setisLoading(true);
    setError(null);
    password=CryptoJS.SHA512(password).toString();
    await axios.post('/api/login',{email,password}).then((result)=>{
      dispatch(LOGIN({_id:result.data._id,userType:result.data.userType,token:result.data.token,verified:true}));
      localStorage.setItem('user',JSON.stringify({_id:result.data._id,userType:result.data.userType,token:result.data.token,verified:true}));
      setisLoading(false);
    })
    .catch((error)=>{
      setError("Incorrect email or password");
      setisLoading(false);
    })
  }

  return {login,error,isLoading};

}