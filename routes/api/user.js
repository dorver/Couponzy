// const { authJwt } = require("../../middleware");
// const controller = require("../../controllers/user");
// const express = require('express');
// const router = express.Router();


// // module.exports = function(router) {
// //   app.use(function(req, res, next) {
// //     res.header(
// //       "Access-Control-Allow-Headers",
// //       "x-access-token, Origin, Content-Type, Accept"
// //     );
// //     next();
// //   });

//   router.get('/test', controller.allAccess);

//   router.get("/test/user", [authJwt.verifyToken], controller.userBoard);

//   router.get(
//     "/test/mod",
//     [authJwt.verifyToken, authJwt.isModerator],
//     controller.moderatorBoard
//   );

//   router.get(
//     "/test/admin",
//      [authJwt.verifyToken, authJwt.isAdmin ],
//     controller.adminBoard
//   );
// // };

// module.exports = router;


const asyncHandler = require('express-async-handler');
  
// import asyncHandler from 'express-async-handler'
const generateToken = require('../../utils/generateToken');
// import generateToken from '../utils/generateToken.js'
const User = require('../../models/User');
// import User from '../models/userModel.js'
const { check, validationResult } = require('express-validator');
const express = require('express');
// import express from 'express'
const router = express.Router()
const{ protect, admin} = require('../../middleware/authMiddleware')
// import { protect, admin } from '../middleware/authMiddleware.js'

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
router.post("/userLogin", asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
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
router.post("/registerUser",
[
     
  [
    check('name', 'חובה להזין שם').notEmpty(),
    check('email', 'חובה להזין אימייל תקין').isEmail(),
    check('password', 'חובה להזין סיסמא בעלת 6 תוים או יותר').isLength({ min: 6 }),
    check('phoneNumber', 'חובה להזין מספר טלפון תקין').notEmpty(),
    check('phoneNumber','חובה להזין מספר טלפון בעל 10 ספרות').isNumeric().isLength({ min:10, max:10}),
    check('birthday', 'חובה להזין תאריך לידה' ).notEmpty() 
  ]
],

asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const { name, email, password, isAdmin, phoneNumber, birthday, gender } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
   // isCustomer,
   // isSeller,
    phoneNumber,
    birthday,
    gender
  })

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    //  isCustomer: user.isCustomer,
    //  isSeller: user.isSeller,
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

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
// const getUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     res.json({
//       _id: user._id,
//       name: user.name,
//       email: user.email,
//       isAdmin: user.isAdmin,
//     })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// // @desc    Update user profile
// // @route   PUT /api/users/profile
// // @access  Private
// const updateUserProfile = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.user._id)

//   if (user) {
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     if (req.body.password) {
//       user.password = req.body.password
//     }

//     const updatedUser = await user.save()

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//       token: generateToken(updatedUser._id),
//     })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// // @desc    Get all users
// // @route   GET /api/users
// // @access  Private/Admin
// const getUsers = asyncHandler(async (req, res) => {
//   const users = await User.find({})
//   res.json(users)
// })

// // @desc    Delete user
// // @route   DELETE /api/users/:id
// // @access  Private/Admin
// const deleteUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)

//   if (user) {
//     await user.remove()
//     res.json({ message: 'User removed' })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// // @desc    Get user by ID
// // @route   GET /api/users/:id
// // @access  Private/Admin
// const getUserById = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id).select('-password')

//   if (user) {
//     res.json(user)
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// // @desc    Update user
// // @route   PUT /api/users/:id
// // @access  Private/Admin
// const updateUser = asyncHandler(async (req, res) => {
//   const user = await User.findById(req.params.id)

//   if (user) {
//     user.name = req.body.name || user.name
//     user.email = req.body.email || user.email
//     user.isAdmin = req.body.isAdmin

//     const updatedUser = await user.save()

//     res.json({
//       _id: updatedUser._id,
//       name: updatedUser.name,
//       email: updatedUser.email,
//       isAdmin: updatedUser.isAdmin,
//     })
//   } else {
//     res.status(404)
//     throw new Error('User not found')
//   }
// })

// export {
//   authUser,
//   registerUser,
//   getUserProfile,
//   updateUserProfile,
//   getUsers,
//   deleteUser,
//   getUserById,
//   updateUser,
// }

module.exports = router;