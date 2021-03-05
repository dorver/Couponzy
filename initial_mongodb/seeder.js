/*const dotenv = require('dotenv');
const colors = require('colors');

const usersJson = require('./userInit.json');

const couponTypesJson = require('./couponTypeInit.json');

const couponsJson = require('./couponInit.json');

const shopsJson = require('./shopInit.json');

const branchsJson = require('./branchInit.json');

const User = require('../models/User');
const CouponType = require('../models/CouponType');
const Coupon = require('../models/Coupon');
const Shop = require('../models/Shop');
const Branch = require('../models/Branch');

const connectDB = require('../config/db');

dotenv.config()

// Connect Database
connectDB();

const importData = async () => {
  try {
    await User.deleteMany()
    await CouponType.deleteMany()
    await Coupon.deleteMany()
    await Shop.deleteMany()
    await Branch.deleteMany()

    const createdUsers = await User.insertMany(usersJson);
    console.log('User Imported!'.green.inverse)

    const sellersUserId = createdUsers.map(user => {
      return { userid: user._id }
    });

    // Add sellersUserId to Shop Collection
    var i = 1;
    const mapSellerShopId = shopsJson.map(shop => {
      return { ...shop, users: sellersUserId[i++].userid }
    });

    const createdShops = await Shop.insertMany(mapSellerShopId);
    console.log('Shop Imported!'.green.inverse)

    const shopId = createdShops.map(shop => {
      return { shopid: shop._id }
    });

    var j = 0;
    const mapBranchId = branchsJson.map(branch => {
      return { ...branch, shop: shopId[j++].shopid }
    });

    const createdBranchs = await Branch.insertMany(mapBranchId);
    console.log('Branch Imported!'.green.inverse);

    const branchesShopId = createdBranchs.map(branch => {
      return { branches: branch._id }
    });

    const createdCouponTypes = await CouponType.insertMany(couponTypesJson);
    console.log('CouponType Imported!'.green.inverse);

    var shopIdcoupon = [0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5];

    var couponTypeIdcoupon = [0, 1, 0, 1, 6, 7, 8, 9, 2, 4, 3, 10];

    var i = 0, j = 0;
    const mapCouponsId = couponsJson.map((coupon) => {
      return { ...coupon, couponType: createdCouponTypes[couponTypeIdcoupon[i++]], shop: createdShops[shopIdcoupon[j++]] }
    });

    await Coupon.insertMany(mapCouponsId);
    console.log('Coupon Imported!'.green.inverse)

    console.log('Data Imported!'.green.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await User.deleteMany()
    await CouponType.deleteMany()
    await Coupon.deleteMany()
    await Shop.deleteMany()
    await Branch.deleteMany()

    console.log('Data Destroyed!'.red.inverse)
    process.exit()
  } catch (error) {
    console.error(`${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}*/