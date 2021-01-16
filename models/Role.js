const mongoose = require("mongoose");

// const Role = mongoose.model(
//   "Role",
  const RoleSchema = new mongoose.Schema({
    name: String
  }
);

module.exports = Role = mongoose.model('role', RoleSchema);