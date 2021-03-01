const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    
      id:{
        type: String
      },
      orderDate: {
        type: Date,
        default: Date.now
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

module.exports = Order = mongoose.model('order', OrderSchema);