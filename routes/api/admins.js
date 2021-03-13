const express = require('express');
var router = express.Router();
const adminController = require('../../controllers/admin');

router.route('/:email&:password')
    .get(adminController.getUser)


router.route('/')
    .get(adminController.getUsers)

router.route('/:id')
    .patch(adminController.updatePos)

module.exports=router;