const RecipeSteps = require('../models/RecipeSteps');
const errorHandler = require('../utils/errorHandler');

module.exports.getById = async (req, res) => {
    try {
        const step = await Recipe.findById( req.params.id);
        res.status(200).json(step);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const steps = await Recipe.find().populate('category');
        res.status(200).json(steps);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getByRecipeId = async (req, res) => {
    try {
        const steps = await Recipe.find({
            recipe: req.params.recipe
        });
        res.status(200).json(steps);

    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    try {
        const step = await new Recipe({
            name: req.body.name,
            description: req.body.description,
            image: req.file ? req.file.path : '',
            recipe: req.body.recipe
        }).save();
        res.status(201).json(step);
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
        const updatedStep = {
            name: req.body.name,
            description: req.body.description,
            recipe: req.body.recipe
        };
        if (req.file) {
            updatedStep.image = req.file.path;
        }

        const step = await Recipe.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedStep},
            {new: true}
        );
        
        res.status(200).json(step);
    } catch(error) {
        errorHandler(res, error);
    }
};