const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const stockSchema = new Schema({
  Pcs: {
    type: Number,
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'Number of pieces must be greater than zero'
    }
  },
  Strips: {
    type: Number,
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'Number of strips must be greater than zero'
    }
  },
  Boxes: {
    type: Number,
    validate: {
      validator: function(value) {
        return value >= 0;
      },
      message: 'Number of boxes must be greater than zero'
    }
  },
});

module.exports = mongoose.model("stock", stockSchema);