const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const mobileSchema = new Schema({
  PhoneNumber:{
    type: String,
    required: true,
    unique: true
  }
},{timestamps:true});

module.exports=mongoose.model("mobile-model",mobileSchema);


