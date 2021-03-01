const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({

  id: {
    type: String
  },
  name: {
    type: String
  },
  inStock: {
    type: Boolean,
    default: false
  },
  expireDate: {
    type: Date,
  },
  couponCode: {
    type: String,
    minlength: 6,
    maxlength: 6
  },
  newPrice: {
    type: Number
  },
  oldPrice: {
    type: Number
  },
  description: {
    type: String
  },
  pictureName: {
    type: String
  },
  published: {
    type: Date,
    default: Date.now
  },
  couponType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'couponType'
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shop'
  },
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'orders'
    }
  ]
});

module.exports = Coupon = mongoose.model('coupon', CouponSchema);