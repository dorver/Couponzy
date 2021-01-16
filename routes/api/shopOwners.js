const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');

const ShopOwner = require('../../models/ShopOwner');

// @route   POST api/users
// @desc    Test route
// @access  Public
router.post('/', 
[
    check('name', 'Name is rquired').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6})
],
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    } 
   
    
    const { name, email, password } = req.body;
    
    try{
    //see if user exist
    let shopOwner = await ShopOwner.findOne({ email });

    if (shopOwner) {
       return res.status(400).json({ errors: [{msg: 'ShopOwner already exists'}] });
    }

    //get users gravatar
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    })

    //create shopOwner
    shopOwner = new ShopOwner({
        name,
        email,
        avatar,
        password
    });

    //encrypt password
     const salt = await bcrypt.genSalt(10);

    shopOwner.password = await bcrypt.hash(password, salt);

    await shopOwner.save();

   
    //return jsonwebtoken
    const payload = {
        shopOwner: {
            id: shopOwner.id
        }
    } 
    jwt.sign(
        payload,
        config.get('secret'),
        { expiresIn: 360000 },
        (err, token) => {
            if(err) throw err;
            res.json({ token });
        }
   );
    } catch(err){
      console.error(err.message);
      res.status(500).send('Server error');  
    }

// @route   GET api/shopOwners
// @desc    Test route
// @access  Public
//router.get('/', (req, res) => res.send('ShopOWners route'));
    
 });

module.exports = router;