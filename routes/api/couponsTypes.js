const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Branch = require('../../models/Order');
const Order = require('../../models/Order');
const CouponType = require('../../models/CouponType');


 // @route   POST api/couponstypes
// @desc     Create coupons type
// @access   Private
router.post( // check for body errors
    '/create',
    
    [
     
      [
        check('id', 'id is required').not().isEmpty()
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
       coupons
      } = req.body;

      console.log("1");

      //Build branch object
      const CouponsTypesFields = {}; // build up shop fields object to insert into the db and check if coming in
      if(id) CouponsTypesFields.id = id;
      if(name) CouponsTypesFields.name = name;
      
      if(coupons) {
        CouponsTypesFields.coupons = coupons.split(',').map(coupon => coupon.trim());
      }
       try {
         let couponType = await CouponType.findOne({id : id}); //look for a order

         if (couponType) {
         
             return res.json("coupon type already exists");
         }

         //Create
         couponType = new CouponType(CouponsTypesFields);

         await couponType.save();
         res.json(couponType);
       } catch(err) {
           console.error(err.message);
           res.status(500).send('Server Error');
       }
    }
);

 // @route   POST api/couponsTypes
// @desc     Edit coupon type
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
         coupons
        } = req.body;
  
        console.log("1");
  
        //Build branch object
        const CouponsTypesFields = {}; // build up shop fields object to insert into the db and check if coming in
        if(id) CouponsTypesFields.id = id;
        if(name) CouponsTypesFields.name = name;
        
        if(coupons) {
          CouponsTypesFields.coupons = coupons.split(',').map(coupon => coupon.trim());
        }
         try {
           let couponType = await CouponType.findOne({id : id}); //look for a coupon type
    
           if (couponType) {
              // Update
               couponType = await CouponType.findOneAndUpdate(
                   { id : id },
                   { $set: CouponsTypesFields },
                   { new: true }
               );
           }
               await couponType.save();
               res.json(couponType);
             } catch(err) {
                 console.error(err.message);
                 res.status(500).send('Server Error');
             
            }
        
    }
);

// @route    GET api/couponsTypes/:id
// @desc     Get coupon type by ID
// @access   Private
router.get('/id/:id', async (req, res) => {
    try {
        const couponType = await CouponType.findOne({ id: `${req.params.id}`});
      
      if (!couponType) {
        return res.status(404).json({ msg: 'coupon type not found' })
      }
  
      res.json(couponType);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }

   
  });
  


  // @route    GET api/order/:orderdate
// @desc     Get order by orderdate
// @access   Private
router.get('/name/:name', async (req, res) => {

    try {
      const couponType = await CouponType.findOne({ name: `${req.params.name}`});
      
      if (!couponType) {
        return res.status(404).json({ msg: 'coupon type not found' })
      }
  
      res.json(couponType);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });


  // @route   GET api/couponsTypes
// @desc    Get all coupons types
// @access  Public
router.get('/', async (req, res) => {
    try {
      const couponType = await CouponType.find();
      res.json(couponType);  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');  
    }
});

  // @route   DELETE api/couponsTypes/:id
// @desc    DELETE coupon type
// @access  Private
router.delete('/id/:id',  async (req, res) => {
    try {
        const couponType = await CouponType.findOne({ id: `${req.params.id}`});
    
        if (!couponType) {
          return res.status(404).json({ msg: 'coupon type not found' });
        }
    
        await couponType.remove();
    
        res.json({ msg: 'coupon type removed' });
      } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
      }
    });

module.exports = router;