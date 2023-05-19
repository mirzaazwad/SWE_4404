import React from 'react';
import NavbarCustomer from '../partials/profile/navbarCustomer';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useToken } from '../../Hooks/useToken';
import { Button, Form } from 'react-bootstrap';
import SearchMap from './SearchMap/searchMap';
import PharmacyArray from './viewPharmacyArray';
import Loader from '../partials/loader';

const PharmacyPage = () => {
  const [pharmacies, setPharmacies] = useState(null);
  const [searchCriteria, setSearchCriteria] = useState("pharmacy");
  const [searchTerm,setSearchTerm]=useState("");
  const [showMAP,setShowMAP]=useState(false);
  const [stopDropDown,setStopDropDown]=useState(false);
  const user=useToken();
  const [location,setLocation]=useState(null);
  const [filteredPharmacy,setFilteredPharmacy]=useState(null);

  const sortPharmacies = (location) =>{
    const getDistance=(lat,lng)=>{
      const distance=Math.sqrt((lat-location.lat)*(lat-location.lat)+(lng-location.lng)*(lng-location.lng));
      return distance;
    }
    const sortedArray = [...filteredPharmacy].sort((a,b)=>{
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
    setFilteredPharmacy(sortedArray);
  }

  const fetchPharmacies = async () => {
    try {
      const response = await axios.get("/api/pharmacies/",{
        headers:{'Authorization': `Bearer ${user.token}`,
        'idType':user.googleId?'google':'email'}
      });
      setPharmacies(response.data.pharmacies);
      setFilteredPharmacy(response.data.pharmacies);
      console.log(pharmacies);
    } catch (error) {
      console.log(error);
    }
  };

  const retrieveUser=async (id)=>{
    await axios.get('/api/profile/user/getUser/'+id,{
      headers:{'Authorization': `Bearer ${user.token}`,
      'idType':user.googleId?'google':'email'}
    }).then((result)=>{
      setLocation(result.data.coordinates);
    })
  }

  useEffect(()=>{
    const retrieve=async ()=>{
      await retrieveUser(user._id);
      await fetchPharmacies();
    }
    retrieve();
  },[user])

  useEffect(()=>{
    if(pharmacies){
      sortPharmacies(location);
    }
  },[location,pharmacies])

  useEffect(()=>{
    if(pharmacies){
        if(searchTerm!=="" && searchCriteria!==""){
          setFilteredPharmacy(pharmacies.filter((pharmacy) =>
            searchCriteria==="pharmacy"?pharmacy.name.toLowerCase().includes(searchTerm.toLowerCase()):searchCriteria==="medicine"?pharmacy.inventory.some(obj => obj.MedicineName.toLowerCase().includes(searchTerm.toLocaleLowerCase())):pharmacy.inventory.some(obj => obj.GenericName.toLowerCase().includes(searchTerm.toLocaleLowerCase()))
        ))
        }
        else{
          setFilteredPharmacy(pharmacies);
        }
    }
  },[searchTerm])

  const { id } = useParams();

  if(pharmacies && location){
    return (
      <div>
        <NavbarCustomer id={id} />
        <section>
        <SearchMap customerId={id} currentLocation={location} pharmacies={pharmacies} startDropDown={setStopDropDown} dropdown={stopDropDown}  show={showMAP} setShow={setShowMAP} setLocation={setLocation}/>
          <div className="container-fluid pharmacy-container">
            <div className="d-flex">
              <p style={{marginLeft:'25%',fontSize:"14px",paddingRight:"5px"}}>Search By: </p>
              <Button className='btn btn-search btn-sm' onClick={()=>setSearchCriteria("pharmacy")} style={{backgroundColor:searchCriteria==="pharmacy"?"#EB006F":"#3b6ce7",border:"none",marginRight:"2px"}}>Pharmacy Name</Button>
              <Button className='btn btn-search btn-sm' onClick={()=>setSearchCriteria("medicine")} style={{backgroundColor:searchCriteria==="medicine"?"#EB006F":"#3b6ce7",border:"none",marginRight:"2px"}}>Medicine Name</Button>
              <Button className='btn btn-search btn-sm' onClick={()=>setSearchCriteria("generic")} style={{backgroundColor:searchCriteria==="generic"?"#EB006F":"#3b6ce7",border:"none"}}>Medicine Generic Name</Button>
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
              <Button className='btn btn-search' style={{marginLeft:"5px"}} onClick={()=>setShowMAP(!showMAP)}>Search By Location</Button>
            </div>
            <PharmacyArray id={id} pharmacies={filteredPharmacy}/>
          </div>
        </section>
      </div>
    );
  }
  else{
    return (
      <Loader></Loader>
    )
  }
};

export default PharmacyPage;