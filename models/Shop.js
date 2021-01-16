const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
   
      id: {
          type: String
      },
      name: {
        type: String
      },
      adress: {
        type: String
      },
      type: {
        type: String
      },
      date: {
        type: Date,
        default: Date.now
      },
      coupons: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'coupon'
      }
    });

module.exports = Shop = mongoose.model('shop', ShopSchema);