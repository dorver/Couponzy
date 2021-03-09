const express = require('express');
var router = express.Router();
const brandController = require('../../controllers/brand');

router.route('/')
    .get(brandController.getBrands)

router.route('/scrape')
    .get(brandController.scrape);

module.exports = router;
