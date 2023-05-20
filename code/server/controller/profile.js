const chatSubscriber = require('../model/chat-subscriber');
const bcrypt = require("bcryptjs");
const userById=require('../Library/userById');

const getUserByID = async (req, res) => {
  const _id = req.params.id;
  try {
    const userObject=new userById(_id);
    const users = await userObject.findById();
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};

const verifyPassword = async (req, res) => {
  const { _id, password } = req.body;
  try {
    const userObject=new userById(_id);
    const result = await userObject.verifyPassword(password);
    res.status(200).json({ result, success: true });
  } catch (err) {
    console.log(err);
    res.status(400).json({ success: false, error: err.message });
  }
};

const changePassword = async (req, res) => {
  const _id = req.params;
  const { currentPassword, password } = req.body;
  try {
    const userObject=new userById(_id);
    await userObject.verifyPassword(currentPassword);
    const users = await userObject.updatePassword(password);
    res.status(200).json({ success: true, users });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

const updateProfilePicture = async(req,res)=>{
  const _id=req.params.id;
  try{
    const userObject=new userById(_id);
    await userObject.updateProfilePicture(req.body.imageURL);
    const result=await chatSubscriber.countDocuments({});
    if(result!==0){
      await chatSubscriber.findOneAndUpdate({senderID:_id},{$set:{senderImageURL:req.body.imageURL}});
      await chatSubscriber.findOneAndUpdate({receiverID:_id},{$set:{receiverImageURL:req.body.imageURL}});
    }
    return res.status(200).json({success:true});
  }
  catch(err){
    console.log(err);
    res.status(400).json({success:false,error:err.message});
  }
}

module.exports = {
  getUserByID,
  changePassword,
  verifyPassword,
  updateProfilePicture
};
