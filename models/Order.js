const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  orderDate: {
    type: Date,
    default: Date.now,
  },
  coupon: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coupon',
  },
  branch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'branch',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
