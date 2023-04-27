const ChatTile = (props) => {
  return (
    <li className="p-2 border-bottom" key={props.index}>
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
        <div className="pt-1" style={{textAlign:"left"}}>
          <p className="fw-bold mb-0">{props.sender}</p>
          <p className="small text-muted">{props.message}</p>
        </div>
      </div>
      <div className="pt-1">
        <p className="small text-muted mb-1">{props.time}</p>
        <span className="badge bg-danger rounded-pill float-end">{props.messageCount}</span>
      </div>
    </div>
    </li>
  );
};

export default ChatTile;
