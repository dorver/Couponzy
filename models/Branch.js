const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  long: {
    type: Number,
    required: true,
  },
  isOpen: {
    type: Boolean,
    default: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shop',
  },
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'order',
    },
  ],
});

module.exports = Branch = mongoose.model('branch', BranchSchema);
