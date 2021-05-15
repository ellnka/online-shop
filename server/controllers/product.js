const Product = require('./../models/Product');
const errorHandler = require('./../utils/errorHandler');

module.exports.getById = async (req, res) => {
    try {
        const product = await Product.findById( req.params.id);
        res.status(200).json(product);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getAll = async (req, res) => {
    try {
        const products = await Product.find().populate('category');
        res.status(200).json(products);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.getByCategoryId = async (req, res) => {
    try {
        const products = await Product.find({
            category: req.params.categoryId
        });
        res.status(200).json(products);

    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.create = async (req, res) => {
    try {
        const product = await new Product({
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            category: req.body.categoryId,
            user: req.user.id,
            imageSmall: (req.files && req.files.imageSmall[0]) ?  req.files.imageSmall[0].path : '',
            imageBig: (req.files && req.files.imageBig[0]) ?  req.files.imageBig[0].path: '',
        }).save();
        res.status(201).json(product);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.delete = async (req, res) => {
    try {
        await Product.remove({_id: req.params.id})
        res.status(200).json({success: true});
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.update = async (req, res) => {
    try {
        const updatedProduct = {
            name: req.body.name,
            description: req.body.description,
            cost: req.body.cost,
            category: req.body.category
        };
    
        if (req.files && req.files.imageSmall[0]) {
            updatedProduct.imageSmall = req.files.imageSmall[0].path;
        }

        if (req.files && req.files.imageBig[0]) {
            updatedProduct.imageBig = req.files.imageBig[0].path;
        }
        
        const product = await Product.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedProduct},
            {new: true}
        );
        res.status(200).json(product);
    } catch(error) {
        errorHandler(res, error);
    }
};