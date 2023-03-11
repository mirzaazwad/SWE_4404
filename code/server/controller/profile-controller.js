const buyerModel = require("../model/buyer-model");
const sellerModel = require("../model/seller-model");
const userModel = require("../model/user-model");
const bcrypt=require('bcryptjs');

const getUserByID = async (req, res) => {
  const { id } = req.params;
  try {
    const users = await userModel.findById(id);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(users);
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
};


const patchUserByID = async (req,res) =>{
  const {id} = req.params;
  try {
    const users = await userModel.findById(id);
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    let data={...req.body};
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(data.password, salt);
    password=hashedPassword;
    await userModel.findOneAndUpdate({_id:id},{
      data
    })
    .then(async (result)=>{
      const getResult=await userModel.findById(id);
      res.status(200).json(getResult);
    })
    .catch((err)=>{
      res.status(404).json({ error: err});
    })
    
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const getBuyerByEmail = async(req,res) =>{
  const email=req.params;
  try{
    const user=await buyerModel.findOne({email:email.email});
    if(!user){
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  }
  catch(err){
    res.status(404).json({error:err.message});
  }
}

const getSellerByEmail = async(req,res) =>{
  const {email}=req.params;
  try{
    const user=await sellerModel.findOne({email:email});
    if(!user){
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  }
  catch(err){
    res.status(404).json({error:err.message});
  }
}

const patchBuyerByEmail = async(req,res) =>{
  const email = req.params;
  try {
    const users = await buyerModel.findOne({email:email.email});
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    await buyerModel.findOneAndUpdate({email:email.email},{
      ...req.body
    })
    .then(async (result)=>{
      const getResult=await buyerModel.findOne({email:email.email});
      res.status(200).json(getResult);
    })
    .catch((err)=>{
      res.status(404).json({ error: err});
    })
    
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const patchSellerByEmail = async(req,res) =>{
  const email = req.params;
  try {
    const users = await sellerModel.findOne({email:email.email});
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    await sellerModel.findOneAndUpdate({email:email.email},{
      ...req.body
    })
    .then(async (result)=>{
      const getResult=await sellerModel.findOne({email:email.email});
      res.status(200).json(getResult);
    })
    .catch((err)=>{
      res.status(404).json({ error: err});
    })
    
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}

const changePassword = async(req,res) =>{
   const {_id,password}=req.body;
  try{
    const User=await userModel.findById(_id);
    console.log(User);
    const match=await bcrypt.compare(User.password,password);
    if(match){
      return res.status(200).json({success:true});
    }
    else{
      return res.status(200).json({success:false});
    }
  }
  catch(error){
      res.status(404).json({found:false,error:error.message});
  }
}


module.exports ={
  getUserByID,
  patchUserByID,
  getBuyerByEmail,
  getSellerByEmail,
  patchBuyerByEmail,
  patchSellerByEmail,
  changePassword
}