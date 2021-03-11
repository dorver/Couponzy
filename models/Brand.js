const mongoose = require('mongoose');

const BrandSchema = new mongoose.Schema({
    place:{
        type: Number,
        required: true,
    },
  name: {
    type: String,
    required: true,
  },
  marketCap: {
    type: String,
    required: true,
  }
});

module.exports = Brand = mongoose.model('brand', BrandSchema);
