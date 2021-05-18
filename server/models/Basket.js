const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const basketSchema = new Schema({
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    },
    list: [{
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

module.exports = mongoose.model('baskets', ordebasketSchemarSchema);


