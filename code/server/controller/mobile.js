const mobileModel = require('../model/mobile-central');
const mobileOTPModel=require('../model/mobile-otp-delivery');

const sendOTP=async(req,res)=>{
  const {phone,otp,sendingTime}=req.body;
  const findMobileNumber=await mobileModel.findOne({PhoneNumber:phone}).lean();
  if(findMobileNumber){
    await mobileOTPModel.deleteMany({PhoneNumber:phone});
    const result=await mobileOTPModel.create({PhoneNumber:phone,OTP:otp,SendingTime:sendingTime});
    return res.status(200).json({result});
  }
  else{
    res.status(400).json({success:false,error:"Mobile Number is invalid"});
  }
}

const validPhoneNumber=async(req,res)=>{
  const {phone}=req.params;
  try{
    const findMobileNumber=await mobileModel.findOne({PhoneNumber:phone}).lean();
    if(findMobileNumber){
      return res.status(200).json({success:true,findMobileNumber});
    }
    else{
      return res.status(400).json({success:false,error:"Mobile Number is invalid"});
    }
  }
  catch(error){
    return res.status(400).json({error:error.message})
  }
}

const verifyOTP=async(req,res)=>{
  const {phone,otp}=req.body;
  try{
    const findResult=await mobileOTPModel.findOne({PhoneNumber:phone,OTP:otp}).lean();
    if(findResult){
      return res.status(200).json({success:true});
    }
    else{
      return res.status(400).json({success:false});
    }
  }
  catch(e){
    return res.status(400).json({success:false,error:e.message});
  }
}

module.exports={sendOTP,verifyOTP,validPhoneNumber};