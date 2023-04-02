import { useDispatch } from "react-redux";
import { LOGOUT } from "../Contexts/action";
import { redirect } from "react-router-dom";

export const useLogout = () =>{
  const dispatch = useDispatch();
  const logout = () =>{
    localStorage.removeItem('user');
    dispatch(LOGOUT());
    return redirect('/');
  }

  return {logout};
}