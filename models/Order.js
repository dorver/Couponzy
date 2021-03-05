const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  orderDate: {
    type: Date,
    default: Date.now,
  },
  coupons: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'coupon',
  },
  branche: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'branch',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
  },
});

module.exports = Order = mongoose.model('order', OrderSchema);
