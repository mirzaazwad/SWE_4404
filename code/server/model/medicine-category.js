const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const medicineCateogry = new Schema({
  cateogry:{
    type: String,
    required: true,
  },
  description:{
    type: String
  }
});

medicineCateogry.statics.getAll=async function(){
  const result=await this.find();
  if(result){
    return result;
  }
  else{
    throw Error('Database error cannot find categories');
  }
}

medicineCateogry.statics.addCategory=async function(name,description){
  if(!name || !description){
    throw Error('Name and description is required');
  }
  const result=await this.create({cateogry:name,description:description});
  return result;
}

module.exports=mongoose.model("medicine-category",medicineCateogry);


