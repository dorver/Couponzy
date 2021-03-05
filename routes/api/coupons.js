const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
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
      description,
      pictureName,
      published,
      couponType,
      shop,
      orders,
    } = req.body;
    console.log(name);

    console.log('1');

    //Build shop object
    const CouponFields = {}; // build up shop fields object to insert into the db and check if coming in
    if (name) CouponFields.name = name;
    if (inStock) CouponFields.inStock = inStock;
    if (expireDate) CouponFields.expireDate = expireDate;
    if (couponCode) CouponFields.couponCode = couponCode;
    if (newPrice) CouponFields.newPrice = newPrice;
    if (oldPrice) CouponFields.oldPrice = oldPrice;
    if (description) CouponFields.description = description;
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

  protect.protect,

  [
    [
      check('id', 'id is required').not().isEmpty(),
      check('name', 'name is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try{
    const {
      // pull out everything form the body
      id,
      name,
      inStock,
      expireDate,
      couponCode,
      newPrice,
      oldPrice,
      description,
      pictureName,
      published,
      couponType,
      shop,
      orders,
    } = req.body;

    console.log('1');

    //Build shop object
    const CouponFields = {}; // build up shop fields object to insert into the db and check if coming in
    if (id) CouponFields.id = id;
    if (name) CouponFields.name = name;
    if (inStock) CouponFields.inStock = inStock;
    if (expireDate) CouponFields.expireDate = expireDate;
    if (couponCode) CouponFields.couponCode = couponCode;
    if (newPrice) CouponFields.newPrice = newPrice;
    if (description) CouponFields.description = description;
    if (pictureName) CouponFields.pictureName = pictureName;
    if (published) CouponFields.published = published;
    if (couponType) CouponFields.couponType = couponType;
    if (shop) CouponFields.shop = shop;

    if (orders) {
      BranchFields.orders = orders.split(',').map((order) => order.trim());
    }

    try {
      let coupon = await Coupon.findOne({ name: name }); //look for a coupon
      if (coupon) {
        return res.json('coupon already exists');
      }

      //Create
      coupon = new Coupon(CouponFields);

      const shop = await Shop.findOne({ id: `${req.params.id}` });
      console.log(shop.name);
      console.log(shop.coupons);

      await shop.coupons.push(coupon);
      await shop.save();
      await coupon.save();

      res.json(coupon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);
// @route   POST api/coupons
// @desc     Edit coupon
// @access   Private
router.post(
  // check for body errors
  '/edit',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    // try{
    const {
      // pull out everything form the body
      id,
      name,
      inStock,
      expireDate,
      couponCode,
      newPrice,
      oldPrice,
      description,
      pictureName,
      published,
      couponType,
      shop,
      orders,
    } = req.body;

    console.log('1');

    //Build shop object
    const CouponFields = {}; // build up shop fields object to insert into the db and check if coming in
    if (id) CouponFields.id = id;
    if (name) CouponFields.name = name;
    if (inStock) CouponFields.inStock = inStock;
    if (expireDate) CouponFields.expireDate = expireDate;
    if (couponCode) CouponFields.couponCode = couponCode;
    if (newPrice) CouponFields.newPrice = newPrice;
    if (description) CouponFields.description = description;
    if (pictureName) CouponFields.pictureName = pictureName;
    if (published) CouponFields.published = published;
    if (couponType) CouponFields.couponType = couponType;
    if (shop) CouponFields.shop = shop;

    if (orders) {
      BranchFields.orders = orders.split(',').map((order) => order.trim());
    }

    try {
      let coupon = await Coupon.findOne({ id: id }); //look for a coupon and update

      if (coupon) {
        // Update
        coupon = await Coupon.findOneAndUpdate(
          { id: id },
          { $set: CouponFields },
          { new: true }
        );
      }
      await coupon.save();
      res.json(coupon);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   DELETE api/coupon/:id
// @desc    DELETE coupon
// @access  Private
router.delete('/delete/:couponId/:shopId', async (req, res) => {
  try {
    const coupon = await Coupon.findOne({ id: `${req.params.couponId}` });

    if (!coupon) {
      return res.status(404).json({ msg: 'Coupon not found' });
    }

    const shop = await Shop.findOne({ id: `${req.params.shopId}` });
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
});

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

// @route    GET api/coupons
// @desc     Get all coupons
// @access   Private
router.get('/', async (req, res) => {
  try {
    const coupons = await Coupon.find();
    res.json(coupons);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.get('/:id', async (req, res) => {
  try {
    const couponn = await Coupon.findById(req.params.id);
    res.json(couponn);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
