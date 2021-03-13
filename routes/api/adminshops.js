const express = require('express');
var router = express.Router();
const adminController = require('../../controllers/admin');

router.route('/')
    .get(adminController.getShops)


router.route('/:id')
    .patch(adminController.addShopToSeller)

module.exports=router;