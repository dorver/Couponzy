const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');


//const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
//const ShopOwner = require('../../models/ShopOwner');
const Coupon = require('../../models/Coupon');
const Shop = require('../../models/Shop');
//const { getShopbyAdress } = require('../../controllers/shop');

 // @route   POST api/coupon
// @desc     Create coupon
// @access   Private
router.post( // check for body errors
  '/createAndAddCouponToShop/:id',

   protect.protect,
  
  [
    [
      check('id', 'id is required').not().isEmpty(),
      check('name', 'name is required').not().isEmpty()
    ]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  // try{
    const { // pull out everything form the body
     id,
     name,
     inStock,
     expireDate,
     couponCode,
     price
      } = req.body;

    console.log("1");

    //Build shop object
    const CouponFields = {}; // build up shop fields object to insert into the db and check if coming in
    if(id) CouponFields.id = id;
    if(name) CouponFields.name = name;
    if(inStock) CouponFields.inStock = inStock;
    if(expireDate) CouponFields.expireDate = expireDate;
    if(couponCode) CouponFields.couponCode = couponCode;
    if(price) CouponFields.price = price;

     try {
       let coupon = await Coupon.findOne({name : name}); //look for a coupon
       if (coupon) {
           //Update
          //  profile = await Profile.findOneAndUpdate(
          //      { user: req.user.id },
          //      { $set: CouponFields },
          //      { new: true }
          //  );

           return res.json("coupon already exists");
       }

       //Create
       coupon = new Coupon(CouponFields);

      
       const shop = await Shop.findOne({ id: `${req.params.id}`});
       console.log(shop.name);
       console.log(shop.coupons);

       await shop.coupons.push(coupon);
       await shop.save();
       await coupon.save();
      
       res.json(coupon);
     } catch(err) {
         console.error(err.message);
         res.status(500).send('Server Error');
     }
  }
);
// @route   POST api/coupons
// @desc     Edit coupon
// @access   Private
router.post( // check for body errors
  '/edit',
  async (req, res) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
    // try{
      const { // pull out everything form the body
        id,
        name,
        inStock,
        expireDate,
        couponCode,
        price
         } = req.body;
   
       console.log("1");
   
       //Build coupon object
       const CouponFields = {}; // build up coupon fields object to insert into the db and check if coming in
       if(id) CouponFields.id = id;
       if(name) CouponFields.name = name;
       if(inStock) CouponFields.inStock = inStock;
       if(expireDate) CouponFields.expireDate = expireDate;
       if(couponCode) CouponFields.couponCode = couponCode;
       if(price) CouponFields.price = price;
   

       try {
         let coupon = await Coupon.findOne({id : id}); //look for a coupon and update

         if (coupon) {
            // Update
             coupon = await Coupon.findOneAndUpdate(
                 { id : id },
                 { $set: CouponFields },
                 { new: true }
             );
         }
             await coupon.save();
             res.json(coupon);
           } catch(err) {
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
      const coupon = await Coupon.findOne({ id: `${req.params.couponId}`});

      if (!coupon) {
        return res.status(404).json({ msg: 'Coupon not found' });
      }
  
      const shop = await Shop.findOne({ id: `${req.params.shopId}`});
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
    const shop = await Shop.findOne({ name: `${req.params.shopName}`});
    
    if (!shop) {
      return res.status(404).json({ msg: 'Shop not found' })
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
router.get('/coupons', async (req, res) => {
    try {
      const coupons = await Coupon.find();
      res.json(coupons);  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');  
    }
});


module.exports = router;