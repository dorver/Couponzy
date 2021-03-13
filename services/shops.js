const Shop = require('../models/Shop');
const User = require('../models/User');


const getShops = async()=>{
    const shops=await Shop.find({});
    return shops;
}

const addShopToSeller = async(userId, shopId)=>{
    const user=await User.findById(userId);
    const shop=await Shop.findById(shopId);
    if(user.shop){
        const oldShop=await Shop.findById(user.shop._id);
        function checkPos(us){
            return us._id==userId;
        }
        ind=oldShop.users.findIndex(checkPos);
        oldShop.users.splice(ind);
    }
    user.shop=shop;
    if(shop.users==null)
        shop.users=new Array();
    shop.users.push(user);
    await user.save();
    await shop.save();
    return shop;
}

module.exports = {
    getShops,
    addShopToSeller
}