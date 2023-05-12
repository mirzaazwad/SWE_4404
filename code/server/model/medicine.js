const mongoose = require("mongoose");
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
  }
});

medicineSchema.statics.addNewMedicine = async function(medicine){
  try{
    const result2=await this.find({...medicine});
    if(result2[0]){
      throw Error('medicine already exists');
    }
    else{
      const result=this.create({...medicine});
      return result;
    }
  }
  catch(err){
    throw Error('medicine could not be added because '+err.message);
  }
}



module.exports = mongoose.model("medicine", medicineSchema);
