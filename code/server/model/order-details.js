const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
    {
      date: {
        type: Date,
        default: Date.now,
      },
      medicines: {
        type: Array,
        required: true,
      },
      customer_data: {
        fullName: {
          type: String,
          required: true,
        },
        address: { 
          type: String, 
          required: true 
        },
        city: { 
          type: String, 
          required: true 
        },
        postalCode: { 
          type: String, 
          required: true 
        },
        country: { 
          type: String, 
          required: true
         },
        payment: { 
          type: String, 
          required: true 
        },
      },
      status: {
        type: String,
        default: "Pending",
      },
      payment_status:{
        type:Boolean,
        default:false
      }
    }
);


module.exports = OrderSchema;
