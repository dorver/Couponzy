const jwt = require('jsonwebtoken');
const config = require("../config/default.json");


const generateToken = (id) => {

    console.log(config.JWT_SECRET);
  return jwt.sign({ id }, config.JWT_SECRET, {
    expiresIn: '30d',
  })
}

//export default generateToken
module.exports = generateToken;