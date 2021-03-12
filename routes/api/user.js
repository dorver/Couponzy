const asyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const User = require('../../models/User');
const Coupon = require('../../models/Coupon');
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middleware/authMiddleware');
const moment = require('moment')
var ObjectId = require('mongodb').ObjectID;
const today = moment().startOf('day')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post(
  '/userLogin',

  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        orders: user.orders,
        birthday: user.birthday,
        email: user.email,
        isAdmin: user.isAdmin,
        isSeller: user.isSeller,
        isCustomer: user.isCustomer,
        shop: user.shop,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  })
);

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.post(
  '/registerUser',
  asyncHandler(async (req, res) => {
    const {
      firstName,
      lastName,
      email,
      password,
      phoneNumber,
      birthday,
      gender,
    } = req.body;

    const userExists = await User.findOne({ email });

    if (userExists) {
      console.log('user exists');
      res.status(400).json({ message: 'User already exists' });
    } else {
      const user = await User.create({
        firstName,
        lastName,
        email,
        password,
        phoneNumber,
        birthday,
        gender,
      });

      if (user) {
        res.status(201).json({
          _id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          isAdmin: user.isAdmin,
          isCustomer: user.isCustomer,
          isSeller: user.isSeller,
          phoneNumber: user.phoneNumber,
          birthday: user.birthday,
          gender: user.gender,
          orders: user.orders,
          token: generateToken(user._id),
        });
      } else {
        res.status(400).json({ message: 'Invalid user data' });
      }
    }
  })
);

// @route    GET api/user/profile
// @desc     Get user profile
// @access   Private
router.get(
  '/getUserProfile',
  protect,
  asyncHandler(async (req, res) => {
    console.log('server/getUserProfile');
    console.log(req);

    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);

// @route    PUT api/user/profile
// @desc     update user profile
// @access   Private
router.put(
  '/updateUserProfile',
  protect,
  asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user._id);

    if (user) {
      user.firstName = req.body.firstName || user.firstName;
      user.lastName = req.body.lastName || user.lastName;
      user.email = req.body.email || user.email;
      if (req.body.password) {
        user.password = req.body.password;
      }
      user.phoneNumber = req.body.phoneNumber || user.phoneNumber;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        firstName: updatedUser.firstName,
        lastName: updatedUser.lastName,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);

// @route    PUT api/user/setUserSeller
// @desc     set User as Seller
// @access   Private
router.put(
  '/setUserSeller',
  protect,
  asyncHandler(async (req, res) => {
    console.log(req.user);
    const user = await User.findById(req.user._id);

    if (user) {
      user.isSeller = true;
      user.isCustomer = false;

      const updatedUser = await user.save();

      res.json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        isAdmin: user.isAdmin,
        isCustomer: user.isCustomer,
        isSeller: user.isSeller,
        phoneNumber: user.phoneNumber,
        birthday: user.birthday,
        gender: user.gender,
        orders: user.orders,
        token: generateToken(user._id),
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  })
);

// @route   GET api/user/getLastUsers
// @desc    get last 5 users use sort
// @access  Public
router.get('/getLastUsers', async (req, res) => {

  try {
    User.find({}).limit(5).sort({ $natural: -1 }).exec(function (err, docs) {
      if (err) console.error(err.stack || err);
      res.json(docs);
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    PUT api/user/getCountLasvtUsers
// @desc     get the count of last day users account
// @access   Private

/*router.get(
  '/getCountLasvtUsers',
  asyncHandler(async (req, res) => {
    Coupon.countDocuments({
        createdAt: {
        $gte: today.toDate(),
        $lte: moment(today).endOf('day').moment
      }
    }, function (err, userCount) {
      if (err)
        return res.status(404).json({ errors: ['Count failed'] });
      console.log('There are %d Users that account Couponzy App', userCount);
      res.json(userCount);
    })
  })
);*/

// @route    PUT api/user/getCountUsers
// @desc     get the count of users
// @access   Private

router.get(
  '/getCountUsers',
  asyncHandler(async (req, res) => {
    User.countDocuments({ isCustomer: true }, function (err, userCount) {
      if (err)
        return res.status(404).json({ errors: ['Count failed'] });
      console.log('There are %d Users that account Couponzy App', userCount);
      res.json(userCount);
    });
  })
);

// @route    PUT api/getCountUsers
// @desc     get the count of users
// @access   Private

router.get(
  '/getMonthlyAccountUsers',
  asyncHandler(async (req, res) => {
    User.find({ '$where': 'this.created_on.toJSON().slice(0, 10) == "2012-07-14"' })
    User.countDocuments({ isCustomer: true }, function (err, userCount) {
      if (err)
        return res.status(404).json({ errors: ['Count failed'] });
      console.log('There are %d Users that account Couponzy App', userCount);
      res.json(userCount);
    });

  })
);

module.exports = router;
