const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const protect = require('../../middleware/authMiddleware');
const { check, validationResult } = require('express-validator');
const Branch = require('../../models/Order');
const Order = require('../../models/Order');


 // @route   POST api/branches
// @desc     Create branch
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
       orderDate,
       coupons,
       branches,
       users
      } = req.body;

      console.log("1");

      //Build branch object
      const OrderFields = {}; // build up shop fields object to insert into the db and check if coming in
      if(id) OrderFields.id = id;
      if(orderDate) OrderFields.orderDate = orderDate;
      if(coupons) OrderFields.coupons = coupons;
      if(branches) OrderFields.branches = branches;
      if(users) OrderFields.users = users;

       try {
         let order = await Order.findOne({id : id}); //look for a order

         if (order) {
         
             return res.json("order already exists");
         }

         //Create
         order = new Order(OrderFields);

         await order.save();
         res.json(order);
       } catch(err) {
           console.error(err.message);
           res.status(500).send('Server Error');
       }
    }
);

 // @route   POST api/orders
// @desc     Edit order
// @access   Private
router.post( // check for body errors
    '/edit',
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
          return res.status(400).json({ errors: errors.array() });
        }
        const { // pull out everything form the body
            id,
            orderDate,
            coupons,
            branches,
            users
           } = req.body;
     
           console.log("1");
     
        //Build order object
        const OrderFields = {}; // build up shop fields object to insert into the db and check if coming in
        if(id) OrderFields.id = id;
        if(orderDate) OrderFields.orderDate = orderDate;
        if(coupons) OrderFields.coupons = coupons;
        if(branches) OrderFields.branches = branches;
        if(users) OrderFields.users = users;

       
  
         try {
           let order = await Order.findOne({id : id}); //look for a order and update
  
           if (order) {
              // Update
               order = await Order.findOneAndUpdate(
                   { id : id },
                   { $set: OrderFields },
                   { new: true }
               );
           }
               await order.save();
               res.json(order);
             } catch(err) {
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
        const order = await Order.findOne({ id: `${req.params.id}`});
      
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' })
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
      const order = await Order.findOne({ orderDate: `${req.params.orderDate}`});
      
      if (!order) {
        return res.status(404).json({ msg: 'Order not found' })
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
      const orders = await Order.find();
      res.json(orders);  
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');  
    }
});

  // @route   DELETE api/order/:id
// @desc    DELETE order
// @access  Private
router.delete('/id/:id',  async (req, res) => {
    try {
        const order = await Order.findOne({ id: `${req.params.id}`});
    
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

module.exports = router;