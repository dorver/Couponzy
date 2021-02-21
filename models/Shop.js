const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({
   
      id: {
          type: String
      },
      name: {
        type: String
      },
      type: {
        type: String
      },
      coupons: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'coupon'
      },
      branches: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'branch'
      },
      users: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'user'
      }
    });

module.exports = Shop = mongoose.model('shop', ShopSchema);