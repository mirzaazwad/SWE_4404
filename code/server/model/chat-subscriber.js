const userModel = require('./user');
const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const chatSubscriberSchema = new Schema({
  senderID:{
    type: String,
    required: true
  },
  receiverID:{
    type: String,
    required: true
  },
  senderName:{
    type:String,
    required:true
  },
  receiverName:{
    type:String,
    required:true
  },
  senderImageURL:{
    type:String,
    required:true
  },
  receiverImageURL:{
    type:String,
    required:true
  },
  lastMessage:{
    type:String,
    required:true
  },
  lastMessageTime:{
    type:String,
    required:true
  }
},{timestamps:true});


chatSubscriberSchema.statics.addChat = async function(senderID,receiverID,messageContent,SentTime){
  const result=await this.find({senderID:senderID,receiverID:receiverID});
  if(result[0]){
    const user=await this.findOneAndUpdate({senderID:senderID,receiverID:receiverID},{
      lastMessage:messageContent,
      lastMessageTime:SentTime
    });
    const user2=await this.findOneAndUpdate({senderID:receiverID,receiverID:senderID},{
      lastMessage:messageContent,
      lastMessageTime:SentTime
    });
  }
  else{
    const sender=await userModel.findById(senderID);
    const receiver=await userModel.findById(receiverID);
    const endresult=await this.create({
      senderID:senderID,
      receiverID:receiverID,
      senderName:sender.username,
      receiverName:receiver.username,
      senderImageURL:sender.imageURL,
      receiverImageURL:receiver.imageURL,
      lastMessage:messageContent,
      lastMessageTime:SentTime
    });
    const endresult2=await this.create({
      senderID:receiverID,
      receiverID:senderID,
      senderName:receiver.username,
      receiverName:sender.username,
      senderImageURL:receiver.imageURL,
      receiverImageURL:sender.imageURL,
      lastMessage:messageContent,
      lastMessageTime:SentTime
    });
  }
}

module.exports=mongoose.model("chat-subscriber",chatSubscriberSchema);


