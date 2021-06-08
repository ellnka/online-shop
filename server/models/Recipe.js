const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const recipeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    image: {
        type: String,
        default: ''
    },
    products: [{
        category: {
            ref: 'categories',
            type: Schema.Types.ObjectId
        },
        weight : {
            type: Number
        }
    }]
});

module.exports = mongoose.model('recipes', recipeSchema);