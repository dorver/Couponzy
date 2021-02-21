const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
//test 10

const UserSchema = new mongoose.Schema({
    id: {
        type: String
    },
    firstName: {
        type: String,
       // required: true
    },
    lastName: {
        type: String
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
    pictureName: {
        type: String
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
    },
    shop: {
        type: String,
        ref: "shop"
    },
    orders: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'order'
    }, 
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