const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({

  id: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  inStock: {
    type: Boolean,
    default: false
  },
  expireDate: {
    type: Date,
    required: true
  },
  couponCode: {
    type: String,
    minlength: 6,
    maxlength: 6,
    index: { unique: true },
    required: true
  },
  newPrice: {
    type: Number,
    required: true
  },
  oldPrice: {
    type: Number,
    required: true
  },

  decription: {
    type: String,
    maxlength: 60,
    required: true

  },
  pictureName: {
    type: String,
    required: true
  },
  published: {
    type: Date,
    default: Date.now
  },
  couponType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'couponTypes'
  },
  shop: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'shops'
  },
  order: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'orders'
    }
  ]
});

module.exports = Coupon = mongoose.model('coupons', CouponSchema);