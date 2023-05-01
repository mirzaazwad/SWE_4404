const mongoose = require('mongoose');

const prescriptionSchema = new mongoose.Schema({
  userId: { type: String, 
    required: true },
  name:
  {
    type:String,
    required:true
  },
    prescriptionImage:{
        type:String,
      },
      image_id:{
        type:String
      },
    createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Prescription', prescriptionSchema);
