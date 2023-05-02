const CollapsibleSender = (props) => {
  return ( 
  <div className="d-flex flex-row justify-content-start">
  <img
    src={props.imageURL}
    alt="avatar 1"
    style={{ width: "45px", height: "100%" }}
  />
  <div>
    <p
      className="small p-2 ms-3 mb-1 rounded-3"
      style={{ backgroundColor: "#3354a9",color:"#FFFFFF" }}
    >
      {props.message}
    </p>
    <p className="small ms-3 mb-3 rounded-3 text-muted">
      {props.datetime}
    </p>
  </div>
</div>
 );
  
}
 
export default CollapsibleSender;