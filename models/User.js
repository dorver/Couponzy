const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//test2

const UserSchema = new mongoose.Schema({
    id: {
        type: String
    },
    name: {
        type: String,
       // required: true
    },
    email: {
        type: String,
       // required: true,
        unique: true
    },
    password: {
        type: String,
        //required: true
    },
    phoneNumber: {
        type: String
    },
    birthday: {
        type: String
    },
    gender: {
        type: String
    },
    shop: {
        type: String,
        ref: "shop"
    },
    isAdmin: {
        type: Boolean,
        //required: true
    },
    isSeller: {
        type: Boolean,
        //required: true
    },
    isCustomer: {
        type: Boolean,
        //required: true
    } 
    // date: {
    //     type: Date,
    //     default: Date.now
    // }
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
  }
  
  UserSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
      next()
    }
  
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
  })
  

module.exports = User = mongoose.model('user', UserSchema);