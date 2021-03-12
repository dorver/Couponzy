const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  inStock: {
    type: Boolean,
    //  default: false,
  },
  expireDate: {
    type: Date,
    // required: true,
  },
  couponCode: {
    type: String,
    minlength: 6,
    maxlength: 6,
    index: { unique: true },
    required: true,
  },
  newPrice: {
    type: Number,
    required: true,
  },
  oldPrice: {
    type: Number,
    required: true,
  },

  description: {
    type: String,
    maxlength: 100,
    // required: true,
  },
  pictureName: {
    type: String,
    //required: true,
  },
  published: {
    type: Date,
    default: Date.now,
  },
  couponType: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'couponType',
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

module.exports = Coupon = mongoose.model('coupon', CouponSchema);
