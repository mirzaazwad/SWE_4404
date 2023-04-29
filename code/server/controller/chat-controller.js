const chatModel=require('../model/chat-model');
const chatSubscriber = require('../model/chat-subscriber');


const addMessage = async (req,res)=>{
  try{
    const {senderID,receiverID,SentTime,messageContent,readStatus}=req.body;
    const result=await chatModel.addChat(senderID,receiverID,messageContent,SentTime,readStatus);
    await chatSubscriber.addChat(senderID,receiverID,messageContent,SentTime);
    return res.status(200).json(result);
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const getMessages = async (req,res) =>{
  try{
    const {senderID,receiverID}=req.body;
    const result = await chatModel.find({senderID:senderID,receiverID:receiverID});
    const result2 = await chatModel.find({senderID:receiverID,receiverID:senderID});
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

const toggleRead = async(req,res)=>{
  try{
    const {senderID,receiverID}=req.body;
    await chatModel.updateMany({senderID:senderID,receiverID:receiverID},{$set : {senderRead:true}});
    return res.status(200).json({success:true});
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const toggleReadReceiver = async(req,res)=>{
  try{
    const {senderID,receiverID}=req.body;
    await chatModel.updateMany({senderID:senderID,receiverID:receiverID},{$set : {receiverRead:true}});
    return res.status(200).json({success:true});
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const countUnread = async(req,res)=>{
  try{
    const {senderID,receiverID}=req.body;
    const result=await chatModel.find({senderID:senderID,receiverID:receiverID,senderRead:false});
    return res.status(200).json({count:result.length});
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const countAllUnread = async(req,res)=>{
  try{
    const {receiverID}=req.body;
    const result=await chatModel.find({senderID:receiverID,senderRead:false});
    return res.status(200).json({count:result.length});
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const countUnreadReceiver = async(req,res)=>{
  try{
    const {senderID,receiverID}=req.body;
    const result=await chatModel.find({senderID:senderID,receiverID:receiverID,receiverRead:false});
    return res.status(200).json({count:result.length});
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

const countAllUnreadReceiver = async(req,res)=>{
  try{
    const {receiverID}=req.body;
    const result=await chatModel.find({senderID:receiverID,receiverRead:false});
    console.log(result.length);
    return res.status(200).json({count:result.length});
  }
  catch(err){
    return res.status(400).json({error:err.message,success:false});
  }
}

module.exports = {
  addMessage,
  getMessages,
  getAllMessages,
  getAllSenders,
  countUnread,
  toggleRead,
  countAllUnread,
  toggleReadReceiver,
  countUnreadReceiver,
  countAllUnreadReceiver
};

