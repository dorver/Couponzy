const mongoose = require('mongoose');

const BranchSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  name: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  adress: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: true,
  },
  lat: {
    type: Number,
  },
  long: {
    type: Number,
  },
  isOpen: {
    type: Boolean,
    required: true,
    default: true,
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shop',
  },
  orders: [
    {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'order',
    },
  ],
});

module.exports = Branch = mongoose.model('branch', BranchSchema);
