const { resolveModuleName } = require('typescript');
const Recipe = require('../models/Recipe');
const errorHandler = require('../utils/errorHandler');

module.exports.getById = async (req, res) => {
    try {
        const product = await Recipe.findById( req.params.id);
        res.status(200).json(product);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const products = await Recipe.find().populate('products.category');
        res.status(200).json(products);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getByCategoryId = async (req, res) => {
    try {
        const products = await Recipe.find({
            category: req.params.categoryId
        });
        res.status(200).json(products);

    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    try {
        const recipe = await new Recipe({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.path : ''
        });
        const products = JSON.parse(req.body.products);
        products.forEach((product) => { recipe.products.push(product); });
        recipe.save();
        res.status(201).json(recipe);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await Recipe.remove({_id: req.params.id})
        res.status(200).json({success: true});
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.update = async (req, res) => {
    try {
        const updatedRecipe = {
            name: req.body.name,
            description: req.body.description,
            products: req.body.products
        };
        if (req.file) {
            updatedRecipe.image = req.file.path;
        }

        const recipe = await Recipe.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedRecipe},
            {new: true}
        );
        res.status(200).json(recipe);
    } catch(error) {
        errorHandler(res, error);
    }
};