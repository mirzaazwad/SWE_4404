const mobileModel = require('../model/mobile-model');
const mobileOTPModel=require('../model/mobile-otp');

const sendOTP=async(req,res)=>{
  const {phone,otp,sendingTime}=req.body;
  const findMobileNumber=await mobileModel.find({PhoneNumber:phone});
  if(findMobileNumber[0]){
    await mobileOTPModel.deleteMany({PhoneNumber:phone});
    const result=await mobileOTPModel.create({PhoneNumber:phone,OTP:otp,SendingTime:sendingTime});
    return res.status(200).json({result});
  }
  else{
    res.status(400).json({success:false,error:"Mobile Number is invalid"});
  }
}

const verifyOTP=async(req,res)=>{
  const {phone,otp}=req.body;
  const findResult=await mobileOTPModel.findOne({PhoneNumber:phone,OTP:otp});
  if(findResult){
    return res.status(200).json({success:true});
  }
  else{
    return res.status(200).json({success:false});
  }
}

module.exports={sendOTP,verifyOTP};