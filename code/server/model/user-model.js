const mongoose = require('mongoose');
const buyerModel = require('./buyer-model');
const sellerModel = require('./seller-model');
const bcrypt = require("bcryptjs");
const Schema=mongoose.Schema;

const userSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true,
    unique: true
  },
  password:{
    type:String,
  },
  phone:{
    type:String
  },
  googleId:{
    type:String
  },
  facebookId:{
    type:String
  },
  address:{
    type:String
  }
},{timestamps:true});


userSchema.statics.signUp = async function(userType,username,email,password){
  if(!email || !password){
    throw Error("All fields are required");
  }
  const exists=await this.findOne({email});
  if(exists){
    throw Error('Email already in use');
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);
  const user=await this.create({username:username,email:email,password:hashedPassword});
  console.log(user);
  if(userType==='buyer'){
    const buyer=await buyerModel.create({email});
    return {user,buyer};
  }
  else{
    const seller=await sellerModel.create({email});
    return {user,seller};
  }
}

userSchema.statics.login = async function(email,password){
  if(!email || !password){
    throw Error("All fields are required");
  }
  const user=await this.findOne({email});
  if(!user){
    throw Error('Account does not exist');
  }
  const buyer=await buyerModel.findOne({email});
  const seller=await sellerModel.findOne({email});
  const match = await bcrypt.compare(password,user.password);
  if(!match){
    throw Error('Incorrect Password');
  }
  if(buyer){
    return {user,buyer};
  }
  else{
    return {user,seller};
  }
}


module.exports=mongoose.model("User",userSchema);