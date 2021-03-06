const asyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const User = require('../../models/User');
const express = require('express');
const router = express.Router();
const { protect, admin } = require('../../middleware/authMiddleware');

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post(
  '/userLogin',

  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    console.log(req.body);
    const user = await User.findOne({ email });

    console.log(user);

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
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error('Invalid email or password');
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
      //isAdmin,
      //isCustomer,
      //isSeller,
      birthday,
      gender,
    } = req.body;
    console.log(req.body);

    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400);
      throw new Error('User already exists');
    }

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
      res.status(400);
      throw new Error('Invalid user data');
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
      res.status(404);
      throw new Error('User not found');
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
      res.status(404);
      throw new Error('User not found');
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
      res.status(404);
      throw new Error('User not found');
    }
  })
);

module.exports = router;
