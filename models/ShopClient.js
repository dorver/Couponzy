const mongoose = require('mongoose');

const ShopClientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
    },
    dateOfBirth: {
        type: String,
        required: true,
    },
    id: {
        type: int,
        required: true,
    },
    phoneNumber: {
        type: int,
        required: true
    },
    avatar: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
    });

module.exports = ShopClient = mongoose.model('shopClient', ShopClientSchema);