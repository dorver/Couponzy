const User = require('../models/User');

const getUser = async (username, password) => {
    const user = await User.findOne({ 'email' : username });
    if (user && user.matchPassword(password)) {
        if(user.isAdmin==true)  
            return user;
        }
    return null;
};

const getUsers = async()=>{
    const users=await User.find({});
    return users;
}

const updatePos = async(id,pos)=>{
    const user= await User.findById(id);
    switch(pos){
        case 0:
            user.isAdmin=true;
            user.isSeller=false;
            user.isCustomer=false;
        break;
        case 1:
            user.isAdmin=false;
            user.isSeller=true;
            user.isCustomer=false;
        break;
        case 2:
            user.isAdmin=false;
            user.isSeller=false;
            user.isCustomer=true;
            user.shop=null;
    }
    await user.save();
    return user;
}

module.exports = {
    getUser,
    getUsers,
    updatePos
}