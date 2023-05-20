import axios from "axios";
import { useState } from "react";
import { Send } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import CustomDateString from "../../Library/CustomDateTimeLibrary/CustomDateString";
import { useNavigate } from "react-router";

const SendMessageChatRoom = (props) => {
  const [message, setMessage] = useState("");
  const navigate=useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();
    let msg = {
      senderID: props.senderID,
      receiverID: props.receiverID,
      SentTime: new CustomDateString(new Date()).getDateString(),
      messageContent: message,
    };
    setMessage("");
    if (message) {
      props.socket.emit("send_message", msg);
      msg.readStatus = "sender";
      await axios.post("/api/profile/chat/send", msg, {
        headers: {
          Authorization: `Bearer ${props.user.token}`,
          'idType':props.user.googleId?'google':'email',
        },
      }).catch(()=>navigate('/error500'));
    }
  };
  return (
    <form
      className="text-muted d-flex justify-content-start align-items-center pe-3 pt-3 mt-2"
      onSubmit={handleSubmit}
    >
      <img
        src={props.imageURL}
        alt="avatar 3"
        style={{ width: "40px", height: "100%" }}
      />
      <input
        type="text"
        className="form-control form-control-sm"
        placeholder="Type message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button className="ms-3" type="submit" disabled={props.noSubscriber}>
        <Send />
      </Button>
    </form>
  );
};

export default SendMessageChatRoom;