const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const mobileOTPSchema = new Schema({
  PhoneNumber:{
    type: String,
    required: true,
    unique: true
  },
  OTP:{
    type: Number,
    required: true
  },
  SendingTime:{
    type:Date,
    required:true
  }
},{timestamps:true});

module.exports=mongoose.model("mobile-otp-delivery",mobileOTPSchema);


