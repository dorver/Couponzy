const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    
      id:{
        type: String
      },
      name: {
        type: String
      },  
      coupons:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'coupon'
      },
      branches:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'branch'
      },
      users:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
      },
    });

module.exports = Coupon = mongoose.model('order', CouponSchema);