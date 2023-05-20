import axios from "axios";
import pharmacyManager from "../User/pharmacy-manager";
import TimeElapsed from "../CustomDateTimeLibrary/TimeElapsed";

class chatPharmacy extends pharmacyManager{
  constructor(_id,token,googleId){
    super(_id,token,googleId);
    this.messagesMap=new Map();
  }

  async retrieveMessages(){
    this.senders = await axios.get("/api/profile/chat/senders/" + this.id, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email'
      },
    }).then(result=>result.data).catch(() => {
      window.location.href = "/error500";
    });
    this.senders.forEach((sent)=>this.messagesMap.set(sent.senderID,{lastMessage:sent.lastMessage,lastMessageTime:sent.lastMessageTime}));
    if(this.senders.length===0){
      this.noSubscriber=true;
    }
    else{
      this.noSubscriber=false;
    }
  }





} 

export default chatPharmacy;