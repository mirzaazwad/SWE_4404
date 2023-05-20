import ChatReceiver from "./chatsReceiverMessage";
import ChatSender from "./chatsSenderMessage";
import Loader from "../partials/loader";

const ChatBox = ({user}) => {
  if(user.messages){
    return ( 
      <div
        className="scrollable pt-3 pe-3"
        style={{
          position: "relative",
          height: "74vh",
          overflowY: "scroll",
        }}
      >
        {user.messages.map((msg, index) =>
          msg.receiverID === user._id ? (
            <ChatReceiver
              imageURL={user.imageURL}
              message={msg.messageContent}
              datetime={msg.SentTime}
            />
          ) : (
            <ChatSender
              imageURL={user.currentSender.senderImageURL}
              message={msg.messageContent}
              datetime={msg.SentTime}
            />
          )
        )}
      </div> );
  }
  else {
    return (
      <Loader/>
    );
  }
}

 
export default ChatBox;