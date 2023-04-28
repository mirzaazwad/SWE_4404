const mongoose = require("mongoose");
const medicineType = require("./medicine-type");
const Schema = mongoose.Schema;

const medicineSchema = new Schema({
  MedicineName: {
    type: String,
    required: true,
    unique:true
  },
  GenericName: {
    type: String,
    required: true,
  },
  TypeID: {
    type: String,
    required: true,
  },
  CateogryID: {
    type: String,
    required: true,
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
  requiresPrescription:{
    type:Boolean
  }
});

medicineSchema.statics.addNewMedicine = async function(medicine){
  console.log('comes here');
  try{
    const result2=await this.find(...medicine);
    if(result2){
      throw Error('medicine already exists');
    }
    else{
      const result=this.create({...medicine,requiresPrescription:false});
      return result;
    }
  }
  catch(err){
    throw Error('medicine could not be added because '+err.message);
  }
}



module.exports = mongoose.model("Medicine-Model", medicineSchema);