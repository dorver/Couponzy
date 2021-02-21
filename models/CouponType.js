const mongoose = require('mongoose');

const CouponTypeSchema = new mongoose.Schema({
     
      id:{
        type: String
      },
      name: {
        type: String
      },  
      coupons:{
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'coupon'
      }
    });

module.exports = Coupon = mongoose.model('couponType', CouponSchema);