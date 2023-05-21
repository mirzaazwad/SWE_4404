const emailVerification = require("../model/email-verification");
const smtp=require('../Library/smtp');
const user=require('../Library/userByEmail');
require("dotenv").config();
const jwt = require("jsonwebtoken");
const buyerModel=require('../model/buyer');
const sellerModel=require('../model/seller');
const deliveryModel=require('../model/delivery');

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "2d" });
};

const signUpUser = async (req, res) => {
  const { userType, username, email, password } = req.body;
  try {
    let result={};
    if(userType==="buyer"){
      const buyer=await buyerModel.signup(username, email, password);
      result={ _id:buyer._id, userType: "buyer" };
    }
    else if(userType==="seller"){
      const seller=await sellerModel.signup(username, email, password);
      console.log(seller);
      result={_id:seller. _id, userType: "seller" };
    }
    else{
      const delivery=await deliveryModel.signup(username, email, password);
      result={ delivery:delivery._id, userType: "delivery"};
    }
    result.token = createToken(result._id);
    console.log(result);
    return res.status(200).json(result);

  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const userObject=new user(email);
    const result=await userObject.login(email,password);
    const token = createToken(result._id);
    return res.status(200).json({ _id:result._id, userType: result.userType,verified:result.verified,token:token});
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const forgot = async (req, res) => {
  const { email } = req.params;
  try {
    await (new user(email)).findByEmail();
    const result=await (new smtp(email)).sendVerificationMail();
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const verifyEmail = async(req,res) =>{
  const {email}=req.params;
  try{
    const userObject=new user(email);
    const mailer=new smtp(email);
    await mailer.generateMail();
    await mailer.sendVerificationMail();
    const result=await userObject.findByEmail();
    console.log(result);
    res.status(200).json({result,success:true});
  }
  catch(error){
    res.status(400).json({error:error.message});
  }
}

const verifyOTP = async(req,res) =>{
  const {email,OTP}=req.body;
  try{
    await emailVerification.verifyOTP(email,OTP);
    res.status(200).json({success:true});
  }
  catch(error){
    res.status(400).json({error:error.message});
  }
}

const verifySignUpInformation = async(req,res) =>{
  const {email} = req.params;
  try{
    const userObject=new user(email);
    const result=await userObject.verifyEmail(req.body.verified);
    return res.status(200).json(await userObject.findByEmail());
  }
  catch(error){
    return res.status(400).json({error:error.message});
  }
}

const deleteOTP = async(req,res) =>{
  const {email}=req.params;
  try{
    await emailVerification.findOneAndDelete({email},{ "sort": { "_id": -1 } });
    res.status(200).json({success:true});
  }
  catch(err){
    res.status(400).json({success:false,error:err.message});
  }
}

const updatePassword = async(req,res)=>{
  const {email}=req.params;
  try{
    const password=req.body.password;
    const result=await (new user(email)).updatePassword(password);
    res.status(200).json({result,success:true});
  }
  catch(err){
    res.status(400).json({error:err.message,success:false});
  }
}

module.exports = {
  signUpUser,
  loginUser,
  forgot,
  verifyEmail,
  verifyOTP,
  verifySignUpInformation,
  deleteOTP,
  updatePassword
};
