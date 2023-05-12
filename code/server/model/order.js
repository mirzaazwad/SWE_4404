const mongoose = require('mongoose');

const { Schema } = mongoose;

const OrderSchema = new Schema({
  userId: {
    type: String,
    required: true,
    unique: true
  },
  order_data: [{
    date: {
      type: Date,
      default: Date.now
    },
    medicines: {
      type: Array,
      required: true
    },
    customer_data: [
      {
        fullName: String,
        address: String,
        city: String,
        postalCode: String,
        country: String,
        payment: String
      }
    ],
    status: {
      type: String,
      default: 'Pending'
      
    }
  }]
});

module.exports = mongoose.model('order', OrderSchema);