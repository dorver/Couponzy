const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema(
  {
    // id: {
    //   type: String,
    // },
    name: {
      type: String,
      required: true,
    },
    inStock: {
      type: Boolean,
      default: false,
      required: true,
    },
    expireDate: {
      type: Date,
      required: true,
    },
    couponCode: {
      type: String,
      minlength: 6,
      maxlength: 6,
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
      required: true,
    },
    pictureName: {
      type: String,
      required: true,
    },
    published: {
      type: Date,
      default: Date.now,
      required: true,
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
  },
  {
    timestamp: true,
  }
);

module.exports = Coupon = mongoose.model('coupon', CouponSchema);
