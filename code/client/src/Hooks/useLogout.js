import { useDispatch } from "react-redux";
import { LOGOUT } from "../Contexts/action";
import { redirect, useNavigate } from "react-router-dom";

export const useLogout = () =>{
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const logout = () =>{
    localStorage.removeItem('user');
    dispatch(LOGOUT());
    return redirect('/');
  }

  return {logout};
}