const userModel = require("../model/user-model");
require("dotenv").config();
const jwt=require('jsonwebtoken');

const createToken = (_id) =>{
  return jwt.sign({_id},process.env.SECRET,{expiresIn: '1d'});
}

const signUpUser = async (req, res) => {
  const {userType,username,email,password} = req.body;
  try{
    const user=await userModel.signUp(userType,username,email, password);
    const token=createToken(user.user._id);
    const _id=user.user._id;
    if('buyer' in user){
      res.status(200).json({_id,userType:'buyer',token});
    }
    else{
      res.status(200).json({_id,userType:'seller',token});
    }
    
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
};

const loginUser = async(req,res)=>{
  const {email,password}=req.body;
  try{
    const user=await userModel.login(email, password);
    const token=createToken(user.user._id);
    const _id=user.user._id;
    if('buyer' in user){
      res.status(200).json({_id,userType:'buyer',token});
    }
    else{
      res.status(200).json({_id,userType:'seller',token});
    }
  }
  catch(err){
    res.status(400).json({error:err.message});
  }
}

module.exports={
  signUpUser,
  loginUser
};