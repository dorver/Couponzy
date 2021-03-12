const User = require('../models/User');

const getUser = async (username, password) => {
    const user = await User.findOne({ 'email' : username });
    if (user && user.password==password) {
        if(user.isAdmin==true)  
            return user;
        }
    return null;
};


module.exports = {
    getUser
}