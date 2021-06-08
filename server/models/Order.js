const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const orderSchema = new Schema({
    date: {
        type: Date,
        default: Date.now()
    },
    order: {
        type: Number,
        required: true,
        unique: true
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
        quantity: {
            type: Number,
            default: 1
        }
    }]
});

module.exports = mongoose.model('orders', orderSchema);