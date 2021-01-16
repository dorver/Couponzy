//log in shopowner and authenticate


const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const auth = require('../../middleware/auth');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
const ShopOwner = require('../../models/ShopOwner');
const controller = require("../../controllers/auth");
const { verifySignUp } = require("../../middleware");

// @route   GET api/auth
// @desc    Test route
// @access  Public
router.get('/', auth, async (req, res) => {
    try {
        const shopOwner = await ShopOwner.findById(req.shopOwner.id).select('-password');
        res.json(shopOwner);
    } catch(err) {
        consol.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Authenticate user and get token
// @access  Public
router.post('/', 
[
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Password is required').exists()
],
 async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ erros: errors.array() });
    } 

    const {email, password } = req.body;

    try{
    //see if user exist
    let shopOwner = await ShopOwner.findOne({ email });

    if (!shopOwner) {
       return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
    }

    const isMatch = await bcrypt.compare(password, shopOwner.password);

    if(!isMatch) {
        return res.status(400).json({ errors: [{msg: 'Invalid Credentials'}] });
    }

    //return jsonwebtoken
    const payload = {
        shopOwner: {
            id: shopOwner.id
        }
    }; 
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


});

// @route   POST api/auth/signup
// @desc    Authenticate user and get token
// @access  Public
router.post('/signup', 
[
    verifySignUp.checkDuplicateUsernameOrEmail,
    verifySignUp.checkRolesExisted
],
      controller.signup
);
router.post('/signin', controller.signin);
module.exports = router;