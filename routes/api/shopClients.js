const express = require('express');
const router = express.Router();

// @route   GET api/shopClient
// @desc    Test route
// @access  Public
router.get('/', (req, res) => res.send('ShopClients route'));

module.exports = router;