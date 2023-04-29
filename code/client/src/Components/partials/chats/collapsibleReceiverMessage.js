const CollapsibleReceiver = (props) => {
  return (
    <div className="d-flex flex-row justify-content-end mb-4 pt-1">
      <div>
        <p className="small p-2 me-3 mb-1 text-white rounded-3 bg-info">
          {props.message}
        </p>
        <p className="small me-3 mb-3 rounded-3 text-muted d-flex justify-content-end">
          {props.datetime}
        </p>
      </div>
      <img
        src={props.imageURL}
        alt="avatar 1"
        style={{ width: "45px", height: "100%" }}
      />
    </div>
  );
};

export default CollapsibleReceiver;
