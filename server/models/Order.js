const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    order: {
        type: Number
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    list:[{
        product: {
            ref: 'products',
            type: Schema.Types.ObjectId
        },
        count: {
            type: Number,
            default: 1
        }
    }],
    address: {
        type: String
    },
    phone: {
        type: String
    }
});

module.exports = mongoose.model('orders', orderSchema);