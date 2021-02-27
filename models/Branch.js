const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({

  id: {
    type: String
  },
  name: {
    type: String
  },
  city: {
    type: String
  },
  adress: {
    type: String
  },
  phoneNumber: {
    type: String
  },
  lat: {
    type: Number
  },
  long: {
    type: Number
  },
  isOpen: {
    type: Boolean
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shop'
  },
  order: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'orders'
    }
  ]
});

module.exports = Shop = mongoose.model('branch', ShopSchema);