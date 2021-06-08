const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    cost: {
        type: Number
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    imageSmall: {
        type: String,
        default: ''
    },
    imageBig: {
        type: String,
        default: ''
    },
    weight: {
        type: Number
    }, 
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

module.exports = mongoose.model('products', productSchema);