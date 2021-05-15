const mongoose = require('mongoose');
const { Schema } = require("mongoose");

const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    },
    imageSrc: {
        type: String,
        default: ''
    },
    user: {
        ref: 'users',
        type: Schema.Types.ObjectId
    }
});

categorySchema.virtual('categoryId').get(function() {
    return this._id;
});

module.exports = mongoose.model('categories', categorySchema);


