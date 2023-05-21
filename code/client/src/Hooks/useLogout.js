import { useDispatch } from "react-redux";
import { LOGOUT } from "../Contexts/action";
import { useNavigate } from "react-router-dom";

export const useLogout = () =>{
  const dispatch = useDispatch();
  const navigate=useNavigate();
  const logout = () =>{
    localStorage.removeItem('user');
    dispatch(LOGOUT());
    navigate('/');
    window.location.reload();
    return;
  }

  return {logout};
}