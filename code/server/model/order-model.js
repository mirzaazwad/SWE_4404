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
    }
  }]
});

module.exports = mongoose.model('Order', OrderSchema);