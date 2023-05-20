const mongoose = require('mongoose');
const Schema=mongoose.Schema;
const bcrypt = require("bcryptjs");
const userSchema=require('./user');
const medicineDetailsSchema=require('./medicine-pharmacy-schema');
const OrderDetailsSchema = require("./order-details-schema");

const sellerSchema = new Schema({
  ...userSchema.obj,
  pharmacy:{
    type: String
  },
  Inventory: [medicineDetailsSchema],
  Orders: [
    {
      _id:{
        type:mongoose.Schema.ObjectId,
        required:true,
        unique:true
      },
      ...OrderDetailsSchema.obj
    },
  ]

},{timestamps:true});

sellerSchema.statics.signup=async function(username,email,password){
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

sellerSchema.statics.verifyPassword = async function(_id,password){
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

sellerSchema.statics.login = async function(email,password){
  if(!email || !password){
    throw Error("All fields are required");
  }
  const seller=await this.findOne({email});
  if(!seller){
    throw Error('Account does not exist');
  }
  const match = await bcrypt.compare(password,seller.password);
  if(!match){
    throw Error('Incorrect Password');
  }
  if(seller.verified===false){
    throw Error('Seller is not verified');
  }
  return seller._doc;
}

sellerSchema.statics.updatePassword=async function(email,password){
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

sellerSchema.statics.signUpGoogle = async function(username,email,googleId,imageURL,verified){
  if(!email || !googleId){
    throw Error("Data is incomplete");
  }
  const exists=await this.findOne({email});
  if(exists){
    return exists;
  }
  const seller=await this.create({username:username,email:email,googleId:googleId,imageURL:imageURL,verified:verified});
  return seller;
}

sellerSchema.statics.loginGoogle = async function(email,googleId){
  if(!email || !googleId){
    throw Error("Data is incomplete");
  }
  const exists=await this.findOne({email});
  if(exists){
    return exists;
  }
  else{
    throw Error("Seller Is Not Registered");
  }
}

sellerSchema.statics.addMedicine = async function (_id, medicine) {
  const medicineDescription=medicine.Type;
  let stock=null;
  if(medicineDescription.hasStrips===true){
    stock={
      Pcs:0,
      Strips:0,
      Boxes:0
    }
  }
  else{
    stock={
      Pcs:0,
      Boxes:0,
    }
  }
  try {
    const result = await this.findById(_id);
    result.Inventory.push({
      ...medicine,
      Stock:stock
    });
    await result.save();
    return await this.findById(_id);
  } catch (err) {
    console.log(err);
    throw Error("error in database schema");
  }
};



module.exports=mongoose.model("pharmacy-manager",sellerSchema);


