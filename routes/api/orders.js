const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Branch = require('../../models/Branch');
const Order = require('../../models/Order');
const User = require('../../models/User');
const Coupon = require('../../models/Coupon');
const { mapReduce } = require('../../models/User');


// @route   POST api/branches
// @desc     Create branch
// @access   Private
router.post(
  // check for body errors
  '/create',

  async (req, res) => {
    const { orderDate, couponId, branchId, userId } = req.body;
    try {
      let coupon = await Coupon.findOne({ _id: couponId });
      if (!coupon) {
        return res.json('Coupon not found');
      }

      let user = await User.findOne({ _id: userId });
      if (!user) {
        return res.json({ message: 'User not found' });
      }

      let branch = await Branch.findOne({ _id: branchId });
      if (!branch) {
        return res.json({ message: 'Branch not found' });
      }

      //Build branch object
      const OrderFields = {}; // build up shop fields object to insert into the db and check if coming in
      if (orderDate) OrderFields.orderDate = orderDate;
      if (coupon) OrderFields.coupon = coupon;
      if (branch) OrderFields.branch = branch;
      if (user) OrderFields.user = user;

      //Create
      order = new Order(OrderFields);

      //add order to user
      user.orders.push(order);
      coupon.orders.push(order);
      branch.orders.push(order);
      //orderBranch.orders.push(order);

      await order.save();
      await user.save();
      await coupon.save();
      await branch.save();
      //await orderBranch.save();

      res.json(user);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route   POST api/orders
// @desc     Edit order
// @access   Private
router.post(
  // check for body errors
  '/edit',
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {
      // pull out everything form the body
      id,
      orderDate,
      coupons,
      branch,
      users,
    } = req.body;

    console.log('1');

    //Build order object
    const OrderFields = {}; // build up shop fields object to insert into the db and check if coming in
    if (id) OrderFields.id = id;
    if (orderDate) OrderFields.orderDate = orderDate;
    if (coupons) OrderFields.coupons = coupons;
    if (branch) OrderFields.branch = branch;
    if (users) OrderFields.users = users;

    try {
      let order = await Order.findOne({ id: id }); //look for a order and update

      if (order) {
        // Update
        order = await Order.findOneAndUpdate(
          { id: id },
          { $set: OrderFields },
          { new: true }
        );
      }
      await order.save();
      res.json(order);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  }
);

// @route    GET api/order/:id
// @desc     Get order by ID
// @access   Private
router.get('/id/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: `${req.params.id}` });

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/order/:orderdate
// @desc     Get order by orderdate
// @access   Private
router.get('/orderDate/:orderDate', async (req, res) => {
  try {
    const order = await Order.findOne({ orderDate: `${req.params.orderDate}` });

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    res.json(order);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route   GET api/order
// @desc    Get all orders
// @access  Public
router.get('/', async (req, res) => {
  try {
    Order.find({}).populate({ path: 'coupon', populate: { path: 'shop' } }).exec(function (err, docs) {
      if (err) console.error(err.stack || err);

      res.json(docs);
    });

  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
21
// @route   DELETE api/order/:id
// @desc    DELETE order
// @access  Private
router.delete('/id/:id', async (req, res) => {
  try {
    const order = await Order.findOne({ id: `${req.params.id}` });

    if (!order) {
      return res.status(404).json({ msg: 'Order not found' });
    }

    await order.remove();

    res.json({ msg: 'Order removed' });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

// @route    GET api/ordersByUserId/:id
// @desc     Get order by ID
// @access   Private
router.get('/ordersByUserId/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id).populate({
      path: 'orders',
      populate: { path: 'coupon branch' },
    });

    if (!user) {
      return res.status(404).json({ msg: 'user not found' });
    }

    const orders = user.orders;

    res.json(orders);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server Error');
  }
});

module.exports = router;
