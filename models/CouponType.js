const mongoose = require('mongoose');

const CouponTypeSchema = new mongoose.Schema({

  id: {
    type: String
  },
  name: {
    type: String
  },
  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'coupons'
    }
  ]
});

module.exports = CouponType = mongoose.model('couponType', CouponTypeSchema);