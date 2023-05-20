const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const userSchema=require('./user');
const bcrypt = require("bcryptjs");

const buyerSchema = new Schema(userSchema,{timestamps:true});

buyerSchema.statics.signup=async function(username,email,password){
  if(!email || !password){
    throw Error("All fields are required");
  }
  const exists=await this.findOne({email});
  if(exists){
    throw Error('Email already in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  return await this.create({username:username,email:email,password:hashedPassword});
}

buyerSchema.statics.verifyPassword = async function(_id,password){
  if(!_id || !password){
    throw Error('A database error occurred');
  }
  const result = await this.findById(_id);
  const match = await bcrypt.compare(password,result.password);
  if(!match){
    throw Error('Password does not match');
  }
  else{
    return {success: true};
  }
}

buyerSchema.statics.login = async function(email,password){
  if(!email || !password){
    throw Error("All fields are required");
  }
  const buyer=await this.findOne({email});
  if(!buyer){
    throw Error('Account does not exist');
  }
  const match = await bcrypt.compare(password,buyer.password);
  if(!match){
    throw Error('Incorrect Password');
  }
  if(buyer.verified===false){
    throw Error('Buyer is not verified');
  }
  return buyer._doc;
}

buyerSchema.statics.updatePassword=async function(email,password){
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const result=await this.findOneAndUpdate({email},{
    password:hashedPassword
  }).catch((err)=>{
    console.log(err);
    throw Error('Password could not be updated')
  })
  return result;
}

buyerSchema.statics.signUpGoogle = async function(username,email,googleId,imageURL,verified){
  if(!email || !googleId){
    throw Error("Data is incomplete");
  }
  const exists=await this.findOne({email});
  if(exists){
    return exists;
  }
  const buyer=await this.create({username:username,email:email,googleId:googleId,imageURL:imageURL,verified:verified});
  return buyer;
}

buyerSchema.statics.loginGoogle = async function(email,googleId){
  if(!email || !googleId){
    throw Error("Data is incomplete");
  }
  const exists=await this.findOne({email});
  if(exists){
    return exists;
  }
  else{
    throw Error("Buyer Is Not Registered");
  }
}

module.exports=mongoose.model("buyer",buyerSchema);


