import { useDispatch } from "react-redux";
import io from "socket.io-client";
import { addNotification,subNotification } from "../Contexts/action";
import { useEffect } from "react";

export const useSocket = (id) =>{
  const socket = io("http://localhost:4110");
  const dispatch=useDispatch();
  const set=new Set();
  useEffect(()=>{
    socket.emit('join room',id);
    socket.on("message",(message)=>{
      if(set.has(message)){
        dispatch(subNotification(1));
      }
      if(message.senderID===id){
        dispatch(addNotification(1));
        set.add(message);
      }
    })
  },[id]);

  return socket;
}