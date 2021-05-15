const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('./../models/User');
const keys = require('./../config/keys');
const errorHandler = require('./../utils/errorHandler');

module.exports.login = async (req, res) => {
    const user = await User.findOne({email: req.body.email});
    if (user) {
        const password = bcrypt.compareSync(req.body.password, user.password);
        if (password) {
           const token = jwt.sign({
               email: user.email,
               userId: user._id
           }, keys.jwt, {expiresIn: 60 * 60 * 24 * 7});
           res.status(200).json({token: `Bearer ${token}`});
        } else {0
            res.status(401).json({message: "Bad email or password"});
        }
    } else {
        res.status(404).json({message: "User not found"});
    }
};

module.exports.register = async (req, res) => {
    const user = await User.findOne({email: req.body.email});

    if (user) {
        res.status(409).json({message: "Email already registered"});
    } else {
        const salt = bcrypt.genSaltSync(10);
        const password = req.body.password;
        const newUser = new User({ 
            email: req.body.email,
            password: bcrypt.hashSync(password, salt)
        });
        try {
            await newUser.save();
            res.status(201).json(newUser);
        } catch(error) {
            errorHandler(res, error);
        } 
    }
};