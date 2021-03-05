const mongoose = require('mongoose');

const CouponTypeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'coupon',
    },
  ],
});

module.exports = CouponType = mongoose.model('couponType', CouponTypeSchema);
