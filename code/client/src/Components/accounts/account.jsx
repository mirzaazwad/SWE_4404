import React, { useState, useEffect } from "react";
import axios from "axios";

import { useToken } from "../../Hooks/useToken";
import NavbarPharmacy from "../partials/profile/navbarPharmacy";
import { Button, Card } from "react-bootstrap";
import Loader from "../partials/loader";
import AccountDisplay from "./accountDisplay";

const Account = () => {
  const [orders, setOrders] = useState(null);
  const [filteredOrders,setFilteredOrders]=useState(null);
  const [transactionStatus,setTransactionStatus] = useState("Completed");
  const [amountPaid,setAmountPaid]=useState(0);
  const [amountPending,setAmountPending]=useState(0);
  
  const user = useToken();
  const userId = user._id;

    useEffect(() => {
        const fetchOrders = async (sellerId) => {
          try{
            console.log(userId);
            console.log(sellerId);
            const res = await axios.get(`/api/pharmacyOrders/getOrder/${sellerId}`, {
              headers: {
                Authorization: `Bearer ${user.token}`,
                idType: user.googleId ? "google" : "email",
              },
            });
            const sortedOrders = res.data.orders.sort((a, b) => new Date(b.date) - new Date(a.date));
            let pricePaid = 0,pricePending=0;
            sortedOrders.forEach((order)=>{
            order.medicines.forEach(item => {
            if(order.status==="Completed"){
              pricePaid+=Number(item.price)
            }
            if(order.status==="Approved"){
              pricePending+=Number(item.price)
            }
          });
        })
        setAmountPaid(pricePaid.toFixed(2));
        setAmountPending(pricePending.toFixed(2));
            setOrders(sortedOrders);
            setFilteredOrders(sortedOrders);
          } catch (err) {
            if (err.response && err.response.status === 401) {
              console.log("Failed to fetch order");
            } else {
              console.error(err);
            }
          }
        };
        fetchOrders(user._id);
      
      }, []);
  
      useEffect(()=>{
        if(orders){
          if(transactionStatus!=="Completed"){
            setFilteredOrders(orders.filter(order=>order.status==="Approved"));
          }
          else{
            setFilteredOrders(orders.filter(order=>order.status==="Completed" ));
          }
        }
      },[transactionStatus,orders])

  
  if(filteredOrders){
    return (
      <div>
        <div className="mb-5">
        <NavbarPharmacy/>
        </div>
        <div className="showStat mb-3 w-50 justify-content-center" style={{marginTop:'12vh',marginLeft:'25%'}}>
        <Card>
        <Card.Header style={{backgroundColor: "#EB006F", color: "white"}}>
              Account Information
        </Card.Header>
        <Card.Body>
          Total Amount {(transactionStatus==="Pending" && "Pending")||((transactionStatus==="Completed" && "Received"))}: {(transactionStatus==="Pending" && amountPending)||((transactionStatus==="Completed" && amountPaid))}
        </Card.Body>
        </Card>
        <div className="d-flex changeViewButton justify-content-center" style={{marginTop:'0.8%',marginRight:'40%'}}>
        <p style={{marginLeft:'25%',fontSize:"14px",paddingRight:"5px"}}>Transaction Status View: </p>
        <Button className='btn btn-search btn-sm' onClick={()=>setTransactionStatus("Completed")} style={{backgroundColor:transactionStatus==="Completed"?"#EB006F":"#3b6ce7",border:"none",marginRight:"2px"}}>Completed</Button>
        <Button className='btn btn-search btn-sm' onClick={()=>setTransactionStatus("Pending")} style={{backgroundColor:transactionStatus==="Pending"?"#EB006F":"#3b6ce7",border:"none",marginRight:"2px"}}>Pending</Button>
        </div>
        </div>
        <AccountDisplay orders={filteredOrders} user={user}/>
        </div>
    );
  }
  else{
    return(
      <Loader/>
    )
  }
};

export default Account;