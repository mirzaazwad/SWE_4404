const mongoose = require('mongoose');
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
  verified:{
    type:Boolean,
    default:false
  },
  phone:{
    type:String
  },
  googleId:{
    type:String
  },
  imageURL:{
    type:String,
    default:'/demoProilePicture.jpg'
  },
  image_id:{
    type:String
  },
  facebookId:{
    type:String
  },
  address:{
    type:String,
  },
  coordinates:{
    type:{
      lat:{
        type:Number
      },
      lng:{
        type:Number
      }
    }
  }
},{timestamps:true});

module.exports=userSchema;