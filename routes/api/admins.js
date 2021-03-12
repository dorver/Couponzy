const express = require('express');
var router = express.Router();
const adminController = require('../../controllers/admin');

router.route('/:email&:password')
    .get(adminController.getUser)

module.exports=router;