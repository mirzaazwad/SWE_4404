const buyerModel = require("../model/buyer-model");
const sellerModel = require("../model/seller-model");
const userModel = require("../model/user-model");

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
    await userModel.findOneAndUpdate({_id:id},{
      ...req.body
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
    const user=await buyerModel.findOne({email});
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
  const email=req.params;
  try{
    const user=await sellerModel.findOne({email});
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
  const {email} = req.params;
  try {
    const users = await buyerModel.findOne({email});
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    await buyerModel.findOneAndUpdate({email},{
      ...req.body
    })
    .then(async (result)=>{
      const getResult=await buyerModel.findOne({email});
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
  const {email} = req.params;
  try {
    const users = await sellerModel.findOne({email});
    if (!users) {
      return res.status(404).json({ error: "User not found" });
    }
    await sellerModel.findOneAndUpdate({email},{
      ...req.body
    })
    .then(async (result)=>{
      const getResult=await sellerModel.findOne({email});
      res.status(200).json(getResult);
    })
    .catch((err)=>{
      res.status(404).json({ error: err});
    })
    
  } catch (err) {
    res.status(404).json({ error: err.message });
  }
}


module.exports ={
  getUserByID,
  patchUserByID,
  getBuyerByEmail,
  getSellerByEmail,
  patchBuyerByEmail,
  patchSellerByEmail
}