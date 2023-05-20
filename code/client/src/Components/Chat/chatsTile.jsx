import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification, subNotification } from '../../Contexts/action';

const ChatTile = ({user,sender,time,message,index}) => {
  const dispatch=useDispatch();
  const [notifications, setNotification] = useState(0);

  useEffect(()=>{
    if(user.notificationMap(sender.senderID)!==null && user._id!==user.currentSender.senderIDd){
      setNotification(notifications+1);
      dispatch(addNotification(1));
    }
    if(sender.senderID===user.currentSender.senderID){
      dispatch(subNotification(notifications));
      setNotification(0);
    }
    const retrieveMessageCount = async () => {
      let obj = Object.create(Object.getPrototypeOf(user), Object.getOwnPropertyDescriptors(user));
      await obj.messageCount(sender);
    };
    retrieveMessageCount();
  },[user])

  return (
    <li className="p-2 border-bottom" key={sender.senderID}>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src={sender.imageURL}
              alt="avatar"
              className="d-flex align-self-center me-3"
              width="60"
            />
            <span className="badge bg-success badge-dot"></span>
          </div>
          <div className="pt-1" style={{ textAlign: "left" }}>
            <p className="fw-bold mb-0">{sender.senderName}</p>
            <p className="small text-muted">{message}</p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">{time}</p>
          <span className="badge bg-danger rounded-pill float-end">
            {notifications}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ChatTile;
