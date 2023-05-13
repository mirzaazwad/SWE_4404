const mongoose = require("mongoose");
const OrderDetailsSchema=require('./order-details');
const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  order_data: [OrderDetailsSchema],
});


module.exports =mongoose.model("order", OrderSchema);
