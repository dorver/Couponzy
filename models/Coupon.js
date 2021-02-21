const mongoose = require('mongoose');

const CouponSchema = new mongoose.Schema({
     
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
        type: Date,
      },
      couponCode: {
        type: String
      },
      NewPrice: {
        type: Number
      },
      oldPrice: {
        type: Number
      },
      decription: {
        type: String
      },
      shop:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'shop'
      },
      couponType:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'couponType'
      },
      order:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'order'
      },
    });

module.exports = Coupon = mongoose.model('coupon', CouponSchema);