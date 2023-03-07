const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const userSchema = new Schema({
  userType: {
    type: String,
    required: true
  },
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
  }
},{timestamps:true});


module.exports=mongoose.model("User",userSchema);


