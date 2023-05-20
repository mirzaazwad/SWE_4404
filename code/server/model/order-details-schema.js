const mongoose = require("mongoose");

const { Schema } = mongoose;

const OrderSchema = new Schema(
    {
      date: {
        type: Date,
        default: Date.now,
      },
      prescription_image:{
        type:String,
        default:"",
      },
      medicines: {
        type: Array,
      },
      customer_data: {
        fullName: {
          type: String,
          required: true,
        },
        email:{
          type: String,
          required:true
        },
        phone:{
          type:String,
          required:true
        },
        pharmacyManagerID:{
          type:String,
          required:true
        },
        address: { 
          type: String, 
          required: true 
        },
        coordinates:{
          type:{
            lat:{
              type:Number
            },
            lng:{
              type:Number
            }
          }
        },
        amount:{
          type:Number,
          required:true
        },
        payment: { 
          type: String,
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
