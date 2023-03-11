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
    const response = await axios.post('/api/login',{email,password});
    if(response.status!==200){
      setisLoading(false);
      setError(response);
    }
    else{
      dispatch(LOGIN({_id:response.data._id,userType:response.data.userType,token:response.data.token}));
      localStorage.setItem('user',JSON.stringify({_id:response.data._id,userType:response.data.userType,token:response.data.token}));
      setisLoading(false);
    }
  }

  return {login,error,isLoading};

}