import { useSelector } from "react-redux";

export const useToken = () =>{
  const currentUser=useSelector((state)=>state.userState.user);
  return !currentUser?JSON.parse(localStorage.getItem('user')):currentUser;
}