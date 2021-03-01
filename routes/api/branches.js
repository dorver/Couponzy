const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Branch = require('../../models/Branch');


 // @route   POST api/branches
// @desc     Create branch
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
       city,
       adress,
       phoneNumber,
       lat,
       long,
       isOpen,
       shop,
       orders,
      } = req.body;

      console.log("1");

      //Build branch object
      const BranchFields = {}; // build up shop fields object to insert into the db and check if coming in
      if(id) BranchFields.id = id;
      if(name) BranchFields.name = name;
      if(city) BranchFields.city = city;
      if(adress) BranchFields.adress = adress;
      if(phoneNumber) BranchFields.phoneNumber = phoneNumber;
      if(lat) BranchFields.lat = lat;
      if(long) BranchFields.long = long;
      if(isOpen) BranchFields.isOpen = isOpen;
      if(shop) BranchFields.shop = shop;

      if(orders) {
          BranchFields.orders = orders.split(',').map(order => order.trim());
       }

       try {
         let branch = await Branch.findOne({name : name}); //look for a branch

         if (branch) {
         
             return res.json("branch already exists");
         }

         //Create
         branch = new Branch(BranchFields);

         await branch.save();
         res.json(shop);
       } catch(err) {
           console.error(err.message);
           res.status(500).send('Server Error');
       }
    }
);

 // @route   POST api/branches
// @desc     Edit branch
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
            city,
            adress,
            phoneNumber,
            lat,
            long,
            isOpen,
            shop,
            orders,
           } = req.body;
     
           console.log("1");
     
           //Build branch object
           const BranchFields = {}; // build up shop fields object to insert into the db and check if coming in
           if(id) BranchFields.id = id;
           if(name) BranchFields.name = name;
           if(city) BranchFields.city = city;
           if(adress) BranchFields.adress = adress;
           if(phoneNumber) BranchFields.phoneNumber = phoneNumber;
           if(lat) BranchFields.lat = lat;
           if(long) BranchFields.long = long;
           if(isOpen) BranchFields.isOpen = isOpen;
           if(shop) BranchFields.shop = shop;

           if(orders) {
            BranchFields.orders = orders.split(',').map(order => order.trim());
         }
  
         try {
           let branch = await Branch.findOne({id : id}); //look for a branch and update
  
           if (branch) {
              // Update
               branch = await Branch.findOneAndUpdate(
                   { id : id },
                   { $set: BranchFields },
                   { new: true }
               );
           }
               await branch.save();
               res.json(branch);
             } catch(err) {
                 console.error(err.message);
                 res.status(500).send('Server Error');
             
            }
        
    }
);

// @route    GET api/branch/:id
// @desc     Get branch by ID
// @access   Private
router.get('/name/:name', async (req, res) => {
    try {
        const branch = await Branch.findOne({ name: `${req.params.name}`});
      
      if (!branch) {
        return res.status(404).json({ msg: 'Branch not found' })
      }
  
      res.json(branch);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }

   
  });
  
  // @route    GET api/branch/:id
// @desc     Get branch by ID
// @access   Private
router.get('/id/:id', async (req, res) => {
    try {
        const branch = await Branch.findOne({ id: `${req.params.id}`});
      console.log("bla");
      if (!branch) {
        return res.status(404).json({ msg: 'Branch not found' })
      }
  
      res.json(branch);
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
      const branch = await Branch.findOne({ adress: `${req.params.adress}`});
      
      if (!branch) {
        return res.status(404).json({ msg: 'Branch not found' })
      }
  
      res.json(branch);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

// @route    GET api/shop/:adress
// @desc     Get shop by adress
// @access   Private
router.get('/city/:city', async (req, res) => {

    try {
      const branch = await Branch.findOne({ adress: `${req.params.city}`});
      
      if (!branch) {
        return res.status(404).json({ msg: 'Branch not found' })
      }
  
      res.json(branch);
    } catch (err) {
      console.error(err.message);
  
      res.status(500).send('Server Error');
    }
  });

  // @route   GET api/branch
// @desc    Get all branches
// @access  Public
router.get('/', async (req, res) => {
    try {
      const branches = await Branch.find();
      res.json(branches);  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');  
    }
});

  // @route   DELETE api/shop/:id
// @desc    DELETE shop
// @access  Private
router.delete('/name/:name',  async (req, res) => {
    try {
        const branch = await Branch.findOne({ name: `${req.params.name}`});
    
        if (!branch) {
          return res.status(404).json({ msg: 'Branch not found' });
        }
    
        await branch.remove();
    
        res.json({ msg: 'Branch removed' });
      } catch (err) {
        console.error(err.message);
    
        res.status(500).send('Server Error');
      }
    });

module.exports = router;