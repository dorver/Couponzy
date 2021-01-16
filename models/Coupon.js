const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
      // shopOwner: {
      //   type: mongoose.Schema.Types.ObjectId,
      //   ref: 'shopOwner'
      // },
      id:{
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
          type: String
      },
      couponCode: {
          type: String
      },
      price: {
          type: Number
      },
      date: {
        type: Date,
        default: Date.now
      }
    });

module.exports = Coupon = mongoose.model('coupon', CouponSchema);