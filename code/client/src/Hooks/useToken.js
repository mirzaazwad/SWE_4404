import { useSelector } from "react-redux";

export const useToken = () =>{
  let currentUser=useSelector((state)=>state.userState.user);
  if(!currentUser){
    currentUser=JSON.parse(localStorage.getItem('user'));
  }
  return currentUser;
}