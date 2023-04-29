const ChatReceiver = (props) => {
  return (
    <div className="d-flex flex-row justify-content-end">
      <div>
        <p
          className="small p-2 me-3 mb-1 text-white rounded-3"
          style={{ backgroundColor: "#3354a9" }}
        >
          {props.message}
        </p>
        <p className="small me-3 mb-3 rounded-3 text-muted">
          {props.datetime}
        </p>
      </div>
      <img
        src={props.imageURL}
        alt="avatar 2"
        style={{ width: "45px", height: "100%" }}
      />
    </div>
  );
};

export default ChatReceiver;
