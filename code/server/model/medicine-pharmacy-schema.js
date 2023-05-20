const mongoose = require("mongoose");
const medicineDetailsSchema=require('./medicine-details-schema');
const stockSchema=require('./stock-schema');
const Schema = mongoose.Schema;

const medicinePharmacySchema = new Schema({
  ...medicineDetailsSchema.obj,
  Stock: stockSchema
});

module.exports=medicinePharmacySchema;