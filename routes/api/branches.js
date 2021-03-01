// const express = require('express');
// const request = require('request');
// const config = require('config');
// const router = express.Router();
// const protect = require('../../middleware/authMiddleware');
// const { check, validationResult } = require('express-validator');

//  // @route   POST api/branches
// // @desc     Create branch
// // @access   Private
// router.post( // check for body errors
//     '/create',
    
//     [
     
//       [
//         check('id', 'id is required').not().isEmpty(),
//         check('name', 'name is required').not().isEmpty()
//       ]
//     ],
//     async (req, res) => {
//       const errors = validationResult(req);
//       if (!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//       }
//     // try{
//       const { // pull out everything form the body
//        id,
//        name,
//        city,
//        adress,
//        phoneNumber,
//        lat,
//        long,
//        isOpen,
//        shop,
//        order,
//       } = req.body;

//       console.log("1");

//       //Build branch object
//       const BranchFields = {}; // build up shop fields object to insert into the db and check if coming in
//       if(id) BranchFields.id = id;
//       if(name) BranchFields.name = name;
//       if(city) BranchFields.city = city;
//       if(adress) BranchFields.adress = adress;
//       if(phoneNumber) BranchFields.phoneNumber = phoneNumber;
//       if(lat) BranchFields.lat = lat;
//       if(long) BranchFields.long = long;
//       if(isOpen) BranchFields.isOpen = isOpen;
//       if(shop) BranchFields.shop = shop;
//       if(order) BranchFields.order = order;

//       if(coupons) {
//           BranchFields.coupons = coupons.split(',').map(coupon => coupon.trim());
//        }

//        try {
//          let shop = await Shop.findOne({name : name}); //look for a shop

//          if (shop) {
//              //Update
//             //  profile = await Profile.findOneAndUpdate(
//             //      { user: req.user.id },
//             //      { $set: BranchFields },
//             //      { new: true }
//             //  );

//              return res.json("shop already exists");
//          }

//          //Create
//          shop = new Shop(BranchFields);

//          await shop.save();
//          res.json(shop);
//        } catch(err) {
//            console.error(err.message);
//            res.status(500).send('Server Error');
//        }
//     }