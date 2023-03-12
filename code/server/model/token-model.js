const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const tokenSchema = new Schema({
  email:{
    type: String,
    required: true,
  },
  OTP:{
    type: String,
    required: true,
  }
},{timestamps:true});

tokenSchema.statics.addRecord = async function(email,OTP){
  if(!email || !OTP){
    throw Error('An error occurred in email or OTP generation');
  }
  await this.deleteMany({email});
  const result = await this.create({email,OTP});
  return result;
}

module.exports=mongoose.model("Token",tokenSchema);


