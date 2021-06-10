const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

module.exports = mongoose.model('users', userSchema);


