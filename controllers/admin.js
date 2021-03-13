const userService = require('../services/users');
const shopService = require('../services/shops');

const getUser = async(req,res)=>{
    const user = await userService.getUser(req.params.email,req.params.password);
    console.log(user);
    res.send(user);
  }

const getUsers = async(req,res)=>{
  const users=await userService.getUsers();
  res.json(users);
}

const updatePos = async(req,res) =>{
  position=req.body.pos;
  const user = await userService.updatePos(req.params.id,position);
  res.json(user);
}

const getShops = async(req,res) =>{
  const shops= await shopService.getShops();
  res.json(shops);
}

const addShopToSeller = async(req,res)=>{
  shopId=req.body.shopId;
  const shop=await shopService.addShopToSeller(req.params.id,shopId);
  res.json(shop);
}

  module.exports = {
    getUser,
    getUsers,
    updatePos,
    getShops,
    addShopToSeller
  };