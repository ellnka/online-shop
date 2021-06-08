const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const recipeStepsSchema = new Schema({
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
    recipe: {
        ref: 'recipes',
        type: Schema.Types.ObjectId
    },
    category: {
        ref: 'categories',
        type: Schema.Types.ObjectId
    },
    weight : {
        type: Number
    }
});



module.exports = mongoose.model('recipeSteps', recipeStepsSchema);


