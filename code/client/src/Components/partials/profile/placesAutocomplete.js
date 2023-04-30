import { useEffect, useState } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";

const PlacesAutocomplete = (props) => {
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  const [addressReceived,setAddressReceived]=useState(false);

  const changeValue=(e)=>{
    setAddressReceived(false);
    props.startDropDown(true);
    setValue(e.target.value);
  }

  const addAddress=(e)=>{
    setAddressReceived(true);
    setValue(e);
  }

  useEffect(()=>{
    if(!addressReceived){
      props.setIsValid(false);
    }
  },[changeValue])

  useEffect(()=>{
    addAddress(props.currentAddress);
  },[props.currentAddress])

  const handleSelect = async (address) => {
    props.setIsValid(true);
    console.log('Props shows that it is valid',props.isValid);
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    console.log({lat,lng});
    props.setNewPosition({ lat, lng });
    props.setIsValid(true);
  };

  return (
    <div className="search-bar">
    <input
      type="text"
      placeholder="Search..."
      value={value}
      onChange={changeValue}
      disabled={!ready}
    />
    {props.dropdown && data.length > 0 && status==="OK" && (
      <ul className="suggestions">
        {data.map(({ place_id, description }) => (
          <li key={place_id} onClick={() => handleSelect(description)}>
            {description}
          </li>
        ))}
      </ul>
    )}
  </div>
  );
};

export default PlacesAutocomplete;