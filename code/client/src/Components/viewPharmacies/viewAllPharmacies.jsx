import React from 'react';
import NavbarCustomer from '../partials/profile/navbarCustomer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToken } from '../../Hooks/useToken';
import { Button, Form } from 'react-bootstrap';
import SearchMap from './SearchMap/searchMap';
import PharmacyArray from './viewPharmacyArray';

const PharmacyPage = () => {
  const [pharmacies, setPharmacies] = useState([]);
  const [searchCriteria, setSearchCriteria] = useState("pharmacy");
  const [searchTerm,setSearchTerm]=useState("");
  const [showMAP,setShowMAP]=useState(false);
  const [stopDropDown,setStopDropDown]=useState(false);
  const user=useToken();
  const [location,setLocation]=useState({});

  const sortPharmacies = (location) =>{
    const getDistance=(lat,lng)=>{
      const distance=Math.sqrt((lat-location.lat)*(lat-location.lat)+(lng-location.lng)*(lng-location.lng));
      return distance;
    }
    const sortedArray = [...pharmacies].sort((a,b)=>{
      if(getDistance(a.coordinates.lat,a.coordinates.lng)>getDistance(b.coordinates.lat,b.coordinates.lng)){
        return 1;
      }
      else if(getDistance(a.coordinates.lat,a.coordinates.lng)<getDistance(b.coordinates.lat,b.coordinates.lng)){
        return -1;
      }
      else{
        return 0;
      }
    });
    setPharmacies(sortedArray);
  }

  const fetchData = async () => {
    try {
      const response = await axios.get("/api/pharmacies/",{
        headers:{'Authorization': `Bearer ${user.token}`}
      });
      setPharmacies(response.data.pharmacies);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveUser=async (id)=>{
    await axios.get('/api/profile/user/getUser/'+id,{
      headers:{'Authorization': `Bearer ${user.token}`}
    }).then((result)=>{
      setLocation(result.data.coordinates);
    })
  }

  useEffect(()=>{
    const retrieve=async ()=>{
      await retrieveUser(user._id);
      await fetchData();
    }
    retrieve();
  },[user])

  useEffect(()=>{
    sortPharmacies(location,pharmacies);
  },[location])

  

  const { id } = useParams();

  return (
    <div>
      <NavbarCustomer id={id} />
      <section>
      <SearchMap customerId={id} currentLocation={location} pharmacies={pharmacies} startDropDown={setStopDropDown} dropdown={stopDropDown}  show={showMAP} setShow={setShowMAP} setLocation={setLocation}/>
        <div className="container-fluid pharmacy-container">
          <div className="d-flex justify-content-center">
            <p style={{fontSize:"14px",paddingRight:"5px"}}>Search By: </p>
            <Button size="sm" variant="primary" onClick={()=>setSearchCriteria("pharmacy")} style={{backgroundColor:searchCriteria==="pharmacy"?"#EB006F":"#3b6ce7",border:"none"}}>Pharmacy Name</Button>
            <Button size="sm" variant="primary" onClick={()=>setSearchCriteria("medicine")} style={{backgroundColor:searchCriteria==="medicine"?"#EB006F":"#3b6ce7",border:"none"}}>Medicine Name</Button>
          </div>
          <div className="d-flex justify-content-center" style={{paddingBottom:"0px"}}>
            <Form className="search-input d-flex">
              <Form.Control
                type="search"
                className=" me-2"
                aria-label="Search"
                placeholder="Search for a pharmacy..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Button className="btn btn-search h-100">Search</Button>
            </Form>
            <Button style={{marginLeft:"5px"}} onClick={()=>setShowMAP(!showMAP)}>Search By Location</Button>
          </div>
          <PharmacyArray id={id} pharmacies={pharmacies}/>
        </div>
      </section>
    </div>
  );
};

export default PharmacyPage;