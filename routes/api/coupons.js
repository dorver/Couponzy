const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const { protect, seller } = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Coupon = require('../../models/Coupon');
const Shop = require('../../models/Shop');

router.post(
  // check for body errors
  '/createCoupon',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try{
    const {
      // pull out everything form the body
      name,
      inStock,
      expireDate,
      couponCode,
      newPrice,
      oldPrice,
      decription,
      pictureName,
      published,
      couponType,
      shop,
      orders,
    } = req.body;
    console.log(name);

    //Build shop object
    const CouponFields = {}; // build up shop fields object to insert into the db and check if coming in
    if (name) CouponFields.name = name;
    if (inStock) CouponFields.inStock = inStock;
    if (expireDate) CouponFields.expireDate = expireDate;
    if (couponCode) CouponFields.couponCode = couponCode;
    if (newPrice) CouponFields.newPrice = newPrice;
    if (oldPrice) CouponFields.oldPrice = oldPrice;
    if (decription) CouponFields.decription = decription;
    if (pictureName) CouponFields.pictureName = pictureName;
    if (published) CouponFields.published = published;
    if (couponType) CouponFields.couponType = couponType;
    if (shop) CouponFields.shop = shop;

    if (orders) {
      CouponFields.orders = orders.split(',').map((order) => order.trim());
    }
    console.log(CouponFields.name);

    try {
      let coupon = await Coupon.findOne({ name: name }); //look for a coupon

      if (coupon) {
        return res.json('coupon already exists');
      }

      //Create
      coupon = new Coupon(CouponFields);
      console.log(coupon.name);

      // console.log(shop.name);
      // console.log(shop.coupons);

      await coupon.save();

      res.json(coupon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/coupon
// @desc     Create coupon
// @access   Private
router.post(
  // check for body errors
  '/createAndAddCouponToShop/:id',

  protect,

  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try{
    const {
      // pull out everything form the body
      name,
      inStock,
      expireDate,
      couponCode,
      oldPrice,
      newPrice,
      decription,
      couponType,
      pictureName,
      // published,
    } = req.body;
    console.log(
      'blaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
    );
    console.log(decription);
    const couponShop = req.params.id;

    const couponCodeExist = await Coupon.findOne({ couponCode: couponCode });

    if (couponCodeExist) {
      res.status(400).json({ message: 'coupon code exists' });
    }

    //Build shop object
    const CouponFields = {}; // build up shop fields object to insert into the db and check if coming in
    if (name) CouponFields.name = name;
    CouponFields.inStock = inStock;
    if (expireDate) CouponFields.expireDate = expireDate;
    if (couponCode) CouponFields.couponCode = couponCode;
    if (newPrice) CouponFields.newPrice = newPrice;
    if (oldPrice) CouponFields.oldPrice = oldPrice;
    if (decription) CouponFields.decription = decription;
    if (pictureName) CouponFields.pictureName = pictureName;
    //if (published) CouponFields.published = published;
    if (couponType) CouponFields.couponType = couponType;
    if (couponShop) CouponFields.shop = couponShop;
    console.log(couponType);
    try {
      //Create
      coupon = new Coupon(CouponFields);
      console.log('====================================================');
      console.log(CouponFields);
      console.log('-----------------------------------------------------');
      console.log(coupon);
      console.log('-----------------------------------------------------');

      const shop = await Shop.findById(req.params.id);
      console.log(shop);
      console.log(coupon.oldPrice);
      if (coupon) {
        await coupon.save();
        await shop.coupons.push(coupon);
        await shop.save();
      }
      const coupons = await Coupon.find();
      res.json(coupons);
      // res.json(coupon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   POST api/coupons
// @desc     Edit coupon
// @access   Private
router.put(
  // check for body errors
  '/edit/:id',
  protect,
  seller,
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try{
    const {
      // pull out everything form the body
      name,
      inStock,
      expireDate,
      couponCode,
      newPrice,
      oldPrice,
      decription,
      pictureName,
      couponType,
      // published,
    } = req.body;

    const coupon = await Coupon.findById(req.params.id);

    if (coupon) {
      (coupon.name = name),
        (coupon.inStock = inStock),
        (coupon.expireDate = expireDate),
        (coupon.couponCode = couponCode),
        (coupon.newPrice = newPrice),
        (coupon.oldPrice = oldPrice),
        (coupon.decription = decription),
        (coupon.pictureName = pictureName),
        (coupon.couponType = couponType);
    }
    try {
      const updatedCoupon = await coupon.save();
      res.json(updatedCoupon);

      console.log('1');

      //Build shop object
      // const CouponFields = {}; // build up shop fields object to insert into the db and check if coming in
      // if (name) CouponFields.name = name;
      // if (inStock) CouponFields.inStock = inStock;
      // if (expireDate) CouponFields.expireDate = expireDate;
      // if (couponCode) CouponFields.couponCode = couponCode;
      // if (newPrice) CouponFields.newPrice = newPrice;
      // if (oldPrice) CouponFields.oldPrice = oldPrice;
      // if (decription) CouponFields.decription = decription;
      // if (pictureName) CouponFields.pictureName = pictureName;
      // //if (published) CouponFields.published = published;
      // if (couponType) CouponFields.couponType = couponType;
      // // if (shop) CouponFields.shop = shop;

      // // if (orders) {
      // //   CouponFields.orders = orders.split(',').map((order) => order.trim());
      // // }

      // try {
      //   let coupon = await Coupon.findById(req.params.id); //look for a coupon and update

      //   if (coupon) {
      //     // Update
      //     coupon = await Coupon.findOneAndUpdate(
      //       { id: id },
      //       { $set: CouponFields },
      //       { new: true }
      //     );
      //   }
      // await coupon.save();
      // res.json(coupon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/coupons/:couponId/shopId
// @desc    DELETE coupon and remove from shop
// @access  Private/seller
router.delete(
  '/delete/:couponId/:shopId',
  protect,
  seller,
  async (req, res) => {
    try {
      const coupon = await Coupon.findById(req.params.couponId);
      console.log(req.params.couponId);
      console.log(req.params.shopId);

      if (!coupon) {
        return res.status(404).json({ msg: 'Coupon not found' });
      }

      const shop = await Shop.findById(req.params.shopId);
      console.log(req.params.shopId);

      if (!shop) {
        return res.status(404).json({ msg: 'Shop not found' });
      }

      await shop.coupons.pull(coupon);
      await shop.save();

      await coupon.remove();

      res.json({ msg: 'Coupon removed' });
    } catch (err) {
      console.error(err.message);

      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/coupon/:shopName
// @desc     Get coupon by shop name
// @access   Private
router.get('/byName/:shopName', async (req, res) => {
  try {
    const shop = await Shop.findOne({ name: `${req.params.shopName}` });

    if (!shop) {
      return res.status(404).json({ msg: 'Shop not found' });
    }

    res.json(shop.coupons);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/coupon/:shopId
// @desc     Get coupon by shop id
// @access   Private
router.get('/byShopId/:shopId', async (req, res) => {
  try {
    console.log(req.params.shopId);
    const shop = await Shop.findOne({ _id: req.params.shopId }).populate(
      'coupons'
    );
    console.log(shop);

    if (!shop) {
      return res.status(404).json({ msg: 'Shop not found' });
    }

    res.json(shop.coupons);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/coupons
// @desc     Get all coupons
// @access   Private
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    console.lof;
    res.json(coupons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/couponbyid
// @desc     Get coupon by id
// @access   Private
router.get('/:id', async (req, res) => {
  try {
    const couponn = await Coupon.findById(req.params.id);
    res.json(couponn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @desc    Update coupon to expired
// @route   PUT /api/coupons/setCouponToExpired/:id
// @access  Private/Admin
router.put('/setCouponToExpired/:id', async (req, res) => {
  try {
    const coupon = await Coupon.findById(req.params.id);
    console.log('settoexpired');
    if (coupon) {
      // Update
      coupon.expireDate = Date.now();
    }
    const updatedCouponExpired = await coupon.save();
    const coupons = await Coupon.find();
    res.json(coupons);
    //res.json(updatedCouponExpired);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
