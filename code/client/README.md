# Using Location Services

To get the address for a particular latitude and longuitude use the following function and pass in the lat as in latitude and lng as longuitude as parameters
```js
const getPlaceDetails = async (lat, lng) => {
    if(lat && lng){
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.REACT_APP_GMPKEY}`
      );
      const data = await response.json();
      if (data.status === "OK") {
        setAddress(data.results[0].formatted_address);
        return data.results[0].formatted_address;
      } else {
        console.log("Geocode was not successful for the following reason:", data.status);
        return null;
      }
    }
  };
```

To get the current location
```js
const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        //use a useState hook over here to store the coordinates got
      });
    } else {
      console.log('cant get location in legacy browser');
    }
  };
```

To get the distance from the current location for sorting by distance
```js
const getDistance=(lat,lng)=>{
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(position => {
      const userLocation = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      const distance=Math.sqrt((lat-userLocation.lat)*(lat-userLocation.lat)+(lng-userLocation.lng)*(lng-userLocation.lng))
      //use a useState hook to store the value of the distance from the current location
    });
  } else {
    console.log('cant get location in legacy browser');
  }
}
```
using these 3 functions should suffice for the filtering criteria
