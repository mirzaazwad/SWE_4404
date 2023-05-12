const Map = (props) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GMPKEY,
    libraries: [`${process.env.REACT_APP_LIBRARY}`],
  });
  if (!isLoaded) {
    return (<Loading show={props.show} handleClose={()=>props.setShow(false)}></Loading>)
  } 
  else{
    return (<Map currentLocation={props.currentLocation} address={props.address} setAddress={props.setAddress}  startDropDown={props.startDropDown} dropdown={props.dropdown} show={props.show} handleClose={()=>props.setShow(false)} setLocation={props.setLocation}></Map>)
  }
}

export default Map;