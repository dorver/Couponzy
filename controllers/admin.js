const userService = require('../services/users');

const getUser = async(req,res)=>{
    const user = await userService.getUser(req.params.email,req.params.password);
    console.log(user);
    res.send(user);
  }

  module.exports = {
    getUser
  };