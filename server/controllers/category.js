const Product = require('../models/Product');
const Category = require('./../models/Category');
const errorHandler = require('./../utils/errorHandler');

module.exports.getAll = async (req, res) => {
    try {
        const categories = await Category.find();
        res.status(200).json(categories);

    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);
        res.status(200).json(category);

    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await Category.remove({_id: req.params.id});
        await Product.remove({category: req.params.id});
        res.status(200).json({success: true});
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    try {
        const category = new Category({
            name: req.body.name,
            description: req.body.description,
            user: req.user.id,
            imageSrc: req.file ? req.file.path : ''
        });
        await category.save();
        res.status(201).json(category);

    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.update = async (req, res) => {
    const updatedCategory = {
        name: req.body.name,
        description: req.body.description
    };

    if (req.file) {
        updatedCategory.imageSrc = req.file.path;
    }

    try {
        const category = await Category.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedCategory},
            {new: true}
        );
        res.status(200).json(category);
    } catch(error) {
        errorHandler(res, error);
    }
};