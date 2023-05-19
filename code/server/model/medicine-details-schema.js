const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const medicineDetailsSchema = new Schema({
  MedicineName: {
    type: String,
    required: true
  },
  GenericName: {
    type: String,
    required: true,
  },
  Type: {
    Name:{
      type: String,
      required: true,
    },
    Description:{
      type: String
    },
    hasStrips:{
      type:Boolean,
      required:true
    }
  },
  Category: {
    category:{
      type: String,
      required: true,
    },
    description:{
      type: String
    }
  },
  Manufacturer: {
    type: String,
    required: true,
  },
  StripsPerBox:{
    type:Number,
  },
  PcsPerStrip:{
    type:Number,
  },
  PcsPerBox:{
    type:Number,
  },
  SellingPrice: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'Selling Price must be greater than zero'
    }
  },
  PurchasePrice: {
    type: Number,
    required: true,
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'Purchase Price must be greater than zero'
    }
  },
  Description:{
    type:String
  },
  prescription:{
    type:Boolean,
    default:false
  },
  imageURL:{
    type:String,
    required:true
  }
});




module.exports = medicineDetailsSchema;
