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
    type: Date,
    required:true
  },
  messageContent:{
    type: String,
    required:true
  }
},{timestamps:true});

module.exports=mongoose.model("Chat",chatSchema);


