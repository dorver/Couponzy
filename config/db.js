const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

const connectDB = async () => {
    try {
        
       await mongoose.connect(db, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true,
        useFindAndModify: false
        })
      // mongoose.connect(mongoose.connect("mongodb://localhost:27017/YourDB", { useNewUrlParser: true });

       console.log('MongoDB Connected...');
       
    } catch(err) {
        console.error(err.message);
        // Exit process with failure
        process.exit(1);
    }
}
//  connectDB.user = require("../models/User");
//  connectDB.role = require("../models/Role");

// connectDB.ROLES = ["user", "admin", "moderator"];

module.exports = connectDB;