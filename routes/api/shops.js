const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
//const getShopbyAdress = require('../../controllers/shop');

const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Shop = require('../../models/Shop');


//const User = require('../../models/User');


 // @route   POST api/shops
// @desc     Create shop
// @access   Private
router.post( // check for body errors
    '/create',
    
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
       adress,
       type,
       coupons
      } = req.body;

      console.log("1");

      //Build shop object
      const ShopFields = {}; // build up shop fields object to insert into the db and check if coming in
      if(id) ShopFields.id = id;
      if(name) ShopFields.name = name;
      if(adress) ShopFields.adress = adress;
      if(type) ShopFields.type = type;

      if(coupons) {
          ShopFields.coupons = coupons.split(',').map(coupon => coupon.trim());
       }

       try {
         let shop = await Shop.findOne({name : name}); //look for a shop

         if (shop) {
             //Update
            //  profile = await Profile.findOneAndUpdate(
            //      { user: req.user.id },
            //      { $set: ShopFields },
            //      { new: true }
            //  );

             return res.json("shop already exists");
         }

         //Create
         shop = new Shop(ShopFields);

         await shop.save();
         res.json(shop);
       } catch(err) {
           console.error(err.message);
           res.status(500).send('Server Error');
       }
    }
);
 // @route   POST api/shops
// @desc     Edit shop
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
         adress,
         type,
         coupons
        } = req.body;
  
        console.log("1");
  
        //Build profile object
        const ShopFields = {}; // build up profile fields object to insert into the db and check if coming in
        if(id) ShopFields.id = id;
        if(name) ShopFields.name = name;
        if(adress) ShopFields.adress = adress;
        if(type) ShopFields.type = type;

        if(coupons) {
            ShopFields.coupons = coupons.split(',').map(coupon => coupon.trim());
         }
  
         try {
           let shop = await Shop.findOne({id : id}); //look for a shop and update
  
           if (shop) {
              // Update
               shop = await Shop.findOneAndUpdate(
                   { id : id },
                   { $set: ShopFields },
                   { new: true }
               );
           }
               await shop.save();
               res.json(shop);
             } catch(err) {
                 console.error(err.message);
                 res.status(500).send('Server Error');
             
            }
        
    }
);

// @route    GET api/shop/:id
// @desc     Get shop by ID
// @access   Private
router.get('/:id', async (req, res) => {
    try {
      const shop = await Shop.findById(req.params.id);
      
      if (!shop) {
        return res.status(404).json({ msg: 'Shop not found' })
      }
  
      res.json(shop);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });
   
// @route    GET api/shop/:adress
// @desc     Get shop by adress
// @access   Private
router.get('/adress/:adress', async (req, res) => {

    try {
      const shop = await Shop.findOne({ adress: `${req.params.adress}`});
      
      if (!shop) {
        return res.status(404).json({ msg: 'Shop not found' })
      }
  
      res.json(shop);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/shop/:type
// @desc     Get shop by type
// @access   Private
router.get('/type/:type', async (req, res) => {

  try {
    const shop = await Shop.findOne({ type: `${req.params.type}`});
    
    if (!shop) {
      return res.status(404).json({ msg: 'Shop not found' })
    }

    res.json(shop);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/shop/:id
// @desc    DELETE shop
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        const shop = await Shop.findById(req.params.id);
    
        if (!shop) {
          return res.status(404).json({ msg: 'Shop not found' });
        }
    
        await shop.remove();
    
        res.json({ msg: 'Shop removed' });
      } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
      }
    });
            
// @route   GET api/shop
// @desc    Get all shops
// @access  Public
router.get('/shops', async (req, res) => {
    try {
      const shops = await Shop.find();
      res.json(shops);  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');  
    }
});

module.exports = router;