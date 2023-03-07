const mongoose = require('mongoose');

const Schema=mongoose.Schema;

const userLocationSchema = new Schema({
  user_id:{
    type:String,
    required:true
  },
  latitude:{
    type:String,
    required:true
  },
  longitude:{
    type:String,
    required:true
  }

},{timestamps:true});


module.exports=mongoose.model("UserLocation",userLocationSchema);


