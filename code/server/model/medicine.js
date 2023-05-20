const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const medicineDetailsSchema=require('./medicine-details-schema')

const medicineSchema = new Schema({
  ...medicineDetailsSchema.obj
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
