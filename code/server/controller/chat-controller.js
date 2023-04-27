const chatModel=require('../model/chat-model');
const chatSubscriber = require('../model/chat-subscriber');


const addMessage = async (req,res)=>{
  try{
    const {senderID,receiverID,SentTime,messageContent}=req.body;
    const result=await chatModel.addChat(senderID,receiverID,messageContent,SentTime);
    const result2=await chatSubscriber.addChat(senderID,receiverID,messageContent,SentTime);
    return res.status(200).json(result);
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const getMessages = async (req,res) =>{
  try{
    const {senderID,receiverID}=req.body;
    console.log(senderID);
    console.log(receiverID);
    const result = await chatModel.find({senderID:senderID,receiverID:receiverID});
    const result2 = await chatModel.find({senderID:receiverID,receiverID:senderID});
    console.log(result);
    return res.status(200).json(result.concat(result2));
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const getAllMessages  = async (req,res) =>{
  try{
    const {id}=req.params;
    const result = await chatModel.find({senderID:id});
    const result2 = await chatModel.find({receiverID:id});
    return res.status(200).json(result.concat(result2));
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const getAllSenders = async (req,res) =>{
  try{
    const {id}=req.params;
    const result = await chatSubscriber.find({receiverID:id});
    return res.status(200).json(result);
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

module.exports = {
  addMessage,
  getMessages,
  getAllMessages,
  getAllSenders
};

