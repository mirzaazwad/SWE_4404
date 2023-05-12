const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const medicineCategory = new Schema({
  category:{
    type: String,
    required: true,
  },
  description:{
    type: String
  }
});

medicineCategory.statics.getAll=async function(){
  const result=await this.find();
  if(result){
    return result;
  }
  else{
    throw Error('Database error cannot find categories');
  }
}

medicineCategory.statics.addCategory=async function(name,description){
  if(!name || !description){
    throw Error('Name and description is required');
  }
  const result=await this.create({category:name,description:description});
  return result;
}

module.exports=mongoose.model("medicine-category",medicineCategory);


