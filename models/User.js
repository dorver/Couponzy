const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      //required: true,
    },
    birthday: {
      type: String,
      //required: true,
    },
    gender: {
      type: String,
      //required: true,
    },
    pictureName: {
      type: String,
    },
    isAdmin: {
      type: Boolean,
      //required: true,
      default: false,
    },
    isSeller: {
      type: Boolean,
      //required: true,
      default: false,
    },
    isCustomer: {
      type: Boolean,
      //required: true,
      default: true,
    },
    shop: {
      type: String,
      ref: 'shop',
    },
    orders: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'order',
      },
    ],
  },
  {
    timestamp: true,
  }
);

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

module.exports = User = mongoose.model('user', UserSchema);
