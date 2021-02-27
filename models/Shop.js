const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema({

  id: {
    type: String
  },
  name: {
    type: String
  },
  pictureName: {
    type: String
  },
  coupons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'coupons'
    }
  ],
  branches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'branchs'
    }
  ],
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users'
    }
  ]
});

module.exports = Shop = mongoose.model('shop', ShopSchema);