const mongoose = require("mongoose");
const medicineType = require("./medicine-type");
const OrderDetailsSchema = require("./order-details");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
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
    hasPcs:{
      type:Boolean,
      required:true
    },
    hasBoxes:{
      type:Boolean,
      required:true
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
  },
  Stock: 
    {Pcs: {
      type: Number,
      validate: {
        validator: function(value) {
          return value >= 0;
        },
        message: 'Number of pieces must be greater than zero'
      }
    },
    Strips: {
      type: Number,
      validate: {
        validator: function(value) {
          return value >= 0;
        },
        message: 'Number of strips must be greater than zero'
      }
    },
    Boxes: {
      type: Number,
      validate: {
        validator: function(value) {
          return value >= 0;
        },
        message: 'Number of boxes must be greater than zero'
      }
    },
  },
});

const pharmacySchema = new Schema({
  pharmacy: {
    type: String,
  },
  pharmacyManagerID: {
    type: String,
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
  },
  Inventory: [medicineSchema],
  Orders: [OrderDetailsSchema]
});

pharmacySchema.statics.addMedicine = async function (_id, medicine) {
  const medicineDescription=medicine.Type;
  let stock=null;
  if(medicineDescription.hasStrips===true && medicineDescription.hasBoxes===true){
    stock={
      Pcs:0,
      Strips:0,
      Boxes:0
    }
  }
  else if(medicineDescription.hasStrips===true){
    stock={
      Pcs:0,
      Strips:0,
    }
  }
  else if(medicineDescription.hasBoxes===true){
    stock={
      Pcs:0,
      Boxes:0,
    }
  }
  else{
    stock={
      Pcs:0,
      Boxes:0,
    }
  }
  try {
    const result = await this.findOne({ pharmacyManagerID: _id });
    result.Inventory.push({
      ...medicine,
      Stock:stock
    });
    await result.save();
    return await this.findOne({ pharmacyManagerID: _id });
  } catch (err) {
    console.log(err);
    throw Error("error in database schema");
  }
};

module.exports = mongoose.model("pharmacy", pharmacySchema);
