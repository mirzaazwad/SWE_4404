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
  Inventory: [medicineSchema],
});

pharmacySchema.statics.addMedicine = async function (_id, medicine) {
  const medicineDescription=await medicineType.findById(medicine.TypeID).select('hasPcs hasStrips hasBoxes');
  console.log(medicineDescription);
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
