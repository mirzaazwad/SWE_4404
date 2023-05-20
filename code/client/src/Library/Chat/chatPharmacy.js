import axios from "axios";
import pharmacyManager from "../User/pharmacy-manager";
import TimeElapsed from "../CustomDateTimeLibrary/TimeElapsed";
import io from "socket.io-client";

class chatPharmacy extends pharmacyManager{
  constructor(_id,token,googleId){
    super(_id,token,googleId);
    this.messagesMap=new Map();
    this.socket = io("http://localhost:4110");
    this.socket.emit("join room", this._id);
    this.message=[];
    this.noSubscriber=false;
    this.socket.on("message",(message)=>{
      this.message.push(message);
      if(message.receiverID===this._id){
        this.messagesMap.set(message.senderID,{lastMessage:message.messageContent,lastMessageTime:message.SentTime});
      }
      else if(message.senderID===this._id){
        this.messagesMap.set(message.receiverID,{lastMessage:message.messageContent,lastMessageTime:message.SentTime});
      }
    })
  }

 async ToggleChat(sent){
    await axios.post('/api/profile/chat/toggleRead',{
      senderID:this._id,
      receiverID:sent.senderID
    },{
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email',
      },
    }).then(()=>{
      this.toggle=this.toggle^true;
    });
    this.currentSender=sent;
  }

  async retrieveMessages(){
    await this.retrieveUserInformation();
    this.senders = await axios.get("/api/profile/chat/senders/" + this._id, {
      headers: {
        Authorization: `Bearer ${this.token}`,
        'idType':this.googleId?'google':'email'
      },
    }).then((result)=>{
      return result.data
    }).catch(() => {
      window.location.href = "/error500";
    });

    this.senders.forEach((sent)=>this.messagesMap.set(sent.senderID,{lastMessage:sent.lastMessage,lastMessageTime:sent.lastMessageTime}));
    if(this.senders.length===0){
      this.noSubscriber=true;
    }
    else{
      this.ToggleChat(this.senders[0]);
      this.noSubscriber=false;
    }
  }

  getTime(senderID){
    console.log(this.messagesMap);
    return (new TimeElapsed(this.messagesMap.get(senderID).lastMessageTime)).getTimeElapsed()
  }

  getLastMessage(senderID){
    return this.messagesMap.get(senderID).lastMessage;
  }





} 

export default chatPharmacy;