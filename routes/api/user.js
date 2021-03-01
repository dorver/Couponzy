
const asyncHandler = require('express-async-handler');
const generateToken = require('../../utils/generateToken');
const User = require('../../models/User');
const express = require('express');
const router = express.Router()
const{ protect, admin} = require('../../middleware/authMiddleware')

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post("/userLogin", asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      firstName: user.firstName,
      LastName: user.LastName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
}));

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
router.post("/registerUser", asyncHandler(async (req, res) => {
  const { firstName, LastName, email, password, isAdmin, isCustomer, isSeller, phoneNumber, birthday, gender } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    firstName,
    LastName,
    email,
    password,
    isAdmin,
    isCustomer,
    isSeller,
    phoneNumber,
    birthday,
    gender
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      LastName: user.LastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isCustomer: user.isCustomer,
      isSeller: user.isSeller,
      phoneNumber: user.phoneNumber,
      birthday: user.birthday,
      gender: user.gender,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
}));



module.exports = router;