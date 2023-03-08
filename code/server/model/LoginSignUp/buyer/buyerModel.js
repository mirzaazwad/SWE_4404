const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const buyerSchema = new Schema({
  username:{
    type: String,
    required: true
  },
  email:{
    type: String,
    required: true
  },
  password:{
    type:String,
    required: true
  },
  dob:{
    type:Date,
    required: true
  },
  phone:{
    type:String
  },
  googleId:{
    type:String
  },
  facebookId:{
    type:String
  }
},{timestamps:true});


module.exports=mongoose.model("Buyer",buyerSchema);


