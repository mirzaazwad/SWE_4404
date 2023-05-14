import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addNotification, subNotification } from '../../Contexts/action';

const ChatTile = (props) => {
  const dispatch=useDispatch();
  const [notifications, setNotification] = useState(0);
  const user = props.user;

  useEffect(()=>{
    if(props.sender.senderID===props.currentSender){
      dispatch(subNotification(notifications));
      setNotification(0);
    }
  },[props.currentSender])
  
  useEffect(() => {
    const retrieveMessageCount = async () => {
      const messages = await axios.post(
        "/api/profile/chat/countMessages/",
        { 
          senderID: props.id,
          receiverID: props.sender.senderID
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            'idType':user.googleId?'google':'email',
          },
        }
      );
      setNotification(messages.data.count);
    };
    retrieveMessageCount();
  }, [props.id]);

  useEffect(()=>{
    console.log(props);
    if(props.messageCount!==null && props.messageCount.receiverID!==props.currentSender && props.messageCount.receiverID===props.sender.senderID && props.messageCount.senderID===props.id){
      setNotification(notifications+1);
      dispatch(addNotification(1));
    }
  },[props.messageCount])

  return (
    <li className="p-2 border-bottom" key={props.sender.senderID}>
      <div className="d-flex justify-content-between">
        <div className="d-flex flex-row">
          <div>
            <img
              src={props.imageURL}
              alt="avatar"
              className="d-flex align-self-center me-3"
              width="60"
            />
            <span className="badge bg-success badge-dot"></span>
          </div>
          <div className="pt-1" style={{ textAlign: "left" }}>
            <p className="fw-bold mb-0">{props.sender.senderName}</p>
            <p className="small text-muted">{props.message}</p>
          </div>
        </div>
        <div className="pt-1">
          <p className="small text-muted mb-1">{props.time}</p>
          <span className="badge bg-danger rounded-pill float-end">
            {notifications}
          </span>
        </div>
      </div>
    </li>
  );
};

export default ChatTile;
