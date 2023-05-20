const mongoose = require('mongoose');
const Schema=mongoose.Schema;

const medicineTypeDescription = new Schema({
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
});

medicineTypeDescription.statics.getAll=async function(){
  const result=await this.find();
  if(result){
    return result;
  }
  else{
    throw Error('Database error cannot find categories');
  }
}

medicineTypeDescription.statics.addType=async function(name,description,strips){
  if(!name || !description || strips===null){
    throw Error('Fields are required');
  }
  else{
    if(strips===true){
      const result=await this.create({Name:name,Description:description,hasStrips:true});
      return result;
    }
    else{
      const result=await this.create({Name:name,Description:description,hasStrips:false});
      return result;
    }
  }
}

module.exports=mongoose.model("medicine-type",medicineTypeDescription);


