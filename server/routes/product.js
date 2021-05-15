const express = require('express');
const passport = require('passport');

const controller = require('../controllers/product');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:categoryId', controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), 
            upload.fields([{name: 'imageSmall', maxCount: 1}, {name: 'imageBig', maxCount: 1}]), 
            controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), 
                     upload.fields([{name: 'imageSmall', maxCount: 1}, {name: 'imageBig', maxCount: 1}]), 
                     controller.update);
router.delete('/:id',  controller.delete);

module.exports = router;