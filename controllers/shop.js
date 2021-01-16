const Shop = require('../models/Shop');
const asyncHandler = require('../middleware/async');



// @desc      Get bootcamps within a radius
// @route     GET /api/v1/bootcamps/radius/:zipcode/:distance
// @access    Private
exports.getShopbyAdress = asyncHandler(async (req, res, next) => {
    const { adress } = req.params;
  
  
  
    const shop = await Shop.find({
      adress: adress
    });
  
    res.status(200).json({
      success: true,
     // count: bootcamps.length,
      data: shop
    });
  });