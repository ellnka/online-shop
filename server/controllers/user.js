const User = require('../models/User');
const errorHandler = require('../utils/errorHandler');

module.exports.getByEmail = async (req, res) => {
    try {
        const user = await User.findOne( {email: req.params.email});
        res.status(200).json(user);
    } catch(error) {
        errorHandler(res, error);
    }
};

module.exports.update = async (req, res) => {
    try {
        const updatedUser = {
            name: req.body.name,
            surname: req.body.surname,
            address: req.body.address
        };
        
        const user = await User.findOneAndUpdate(
            {_id: req.params.id},
            {$set: updatedUser},
            {new: true}
        );
        res.status(200).json(user);
    } catch(error) {
        errorHandler(res, error);
    }
};