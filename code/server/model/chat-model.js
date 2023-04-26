const userModel = require('./user-model');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const chatSchema = new Schema({
  senderID:{
    type: String,
    required: true
  },
  receiverID:{
    type: String,
    required: true
  },
  senderName:{
    type: String,
    required:true
  },
  receiverName:{
    type: String,
    required:true
  },
  SentTime:{
    type: String,
    required:true
  },
  messageContent:{
    type: String,
    required:true
  },
  messageOrder:{
    type: Number,
    default:0
  }
},{timestamps:true});

chatSchema.statics.addChat = async function(senderID,receiverID,messageContent,sentTime){
  try{
    const sender=await userModel.findById(senderID);
    const receiver=await userModel.findById(receiverID);
    const order=await this.findOne().sort({_id: -1}).limit(1);
    let orderCount=0;
    if(order){
      orderCount=order.messageOrder+1;
    }
    const result=await this.create({senderID:senderID,receiverID:receiverID,senderName:sender.username,receiverName:receiver.username,messageContent:messageContent,SentTime:sentTime,messageOrder:orderCount});
    return result;
  }
  catch(err){
    throw Error(err.message);
  }
}

module.exports=mongoose.model("Chat",chatSchema);


