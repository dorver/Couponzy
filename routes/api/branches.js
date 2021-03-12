const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Branch = require('../../models/Branch');
const Shop = require('../../models/Shop');
const Coupon = require('../../models/Coupon');
const moment = require('moment')
const today = moment().startOf('day')


// @route   POST api/branches
// @desc     Create branch
// @access   Private
router.post( // check for body errors
  '/create',
  [
    [check('name', 'name is required').not().isEmpty()]
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { // pull out everything form the body
      name, city, address, phoneNumber, lat, long, shop,
    } = req.body;
    // Build up branch fields object to insert into the db and check if coming in
    const BranchFields = {};
    if (name) BranchFields.name = name;
    if (city) BranchFields.city = city;
    if (address) BranchFields.address = address;
    if (phoneNumber) BranchFields.phoneNumber = phoneNumber;
    if (lat) BranchFields.lat = lat;
    if (long) BranchFields.long = long;
    if (shop) BranchFields.shop = shop;

    const shopId = await Shop.findById(req.body.shop);

    try {
      let branch = await Branch.findOne({ name: name }); //look for a branch
      if (branch) { return res.json("branch already exists"); }
      //Create
      branch = new Branch(BranchFields);

      await branch.save().then((newBranch) => {
        shopId.branches.push(newBranch);
        shopId.save();
        res.json(branch);
      })
    } catch (err) {
      console.error(err.message);
      console.log("err.message");
      res.status(500).send('Server Error');
      res.json({ status: 'failed' });
    }
  }
);

// @route   POST api/branches
// @desc     Edit branch by id
// @access   Private
router.post( // check for body errors
  '/:id',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const { // pull out everything form the body
      name, city, address, phoneNumber, lat, long, shop,
    } = req.body;

    try {

      let branch = await Branch.findById(req.params.id); //look for a branch and update

      if (!branch)
        return null;
      // Update
      branch.name = name;
      branch.city = city;
      branch.address = address;
      branch.phoneNumber = phoneNumber;
      branch.lat = lat;
      branch.long = long;
      branch.shop = shop;

      await branch.save();
      res.json(branch);
    } catch (err) {
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
    const branch = await Branch.findOne({ name: `${req.params.name}` });

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
    const branch = await Branch.findOne({ id: `${req.params.id}` });
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
    const branch = await Branch.findOne({ adress: `${req.params.adress}` });

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
    const branch = await Branch.findOne({ adress: `${req.params.city}` });

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
    Branch.find({}).populate({ path: 'shop' }).exec(function (err, docs) {
      if (err) console.error(err.stack || err);
      res.json(docs);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route   DELETE api/branches/:id
// @desc    DELETE shop
// @access  Private
router.delete('/:id', async (req, res) => {
  try {

    const branch = await Branch.findById(req.params.id);

    if (!branch) {
      return res.status(404).json({ msg: 'Branch not found' });
    }

    const parentShopId = await Shop.findById(branch.shop);
    
    if (!parentShopId) {
      return res.status(404).json({ msg: 'Shop not found' });
    }

    await parentShopId.branches.pull(branch);
    await parentShopId.save();

    await branch.remove();
    res.json({ msg: 'Branch removed' });

  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   GET api/branch
// @desc    Search by {} branches
// @access  Public
router.get('/', async (req, res) => {

  try {
    Branch.find({}).populate({ path: 'shop' }).exec(function (err, docs) {
      if (err) console.error(err.stack || err);
      res.json(docs);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    GET api/getCountBranches
// @desc     get the count of branches
// @access   Private
router.get(
  '/getCountBranches',
  (async (req, res) => {
    Branch.countDocuments({ }, function (err, branchCount) {
      if (err)
        return res.status(404).json({ errors: ['Count failed'] });
      console.log('There are %d Branches that account Couponzy App', branchCount);
      res.json(branchCount);
    });
  })
);

// @route    GET api/coupons/getCountCoupons
// @desc     get the count of users
// @access   Private
router.get(
  '/getCountCoupons',
  (async (req, res) => {
    Coupon.countDocuments({ }, function (err, couponCount) {
      if (err)
        return res.status(404).json({ errors: ['Count failed'] });
      console.log('There are %d Branches that account Couponzy App', couponCount);
      res.json(couponCount);
    });
  })
);

// @route    GET api/coupons/getCountValidCoupons
// @desc     get the count of users
// @access   Private
router.get(
  '/getCountValidCoupons',
  (async (req, res) => {
    Coupon.countDocuments({ "domain.ApplicationCase.fields.ExpireDate": { $lte : today.toDate() }}, function (err, couponCount) {
      if (err)
        return res.status(404).json({ errors: ['Count failed'] });
      console.log('There are %d Branches that account Couponzy App', couponCount);
      res.json(couponCount);
    });
  })
);

// @route    GET api/getCountBranches
// @desc     get the count of isOpen branches
// @access   Private
router.get(
  '/getCountIsOpenBranches',
  (async (req, res) => {
    Branch.countDocuments({ isOpen: true }, function (err, branchIsOpenCount) {
      if (err)
        return res.status(404).json({ errors: ['Count failed'] });
      console.log('There are %d Branches that account Couponzy App', branchIsOpenCount);
      res.json(branchIsOpenCount);
    });
  })
);

module.exports = router;
