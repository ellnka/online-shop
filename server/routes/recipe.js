const express = require('express');
const passport = require('passport');

const controller = require('../controllers/recipe');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:categoryId', controller.getByCategoryId);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);
router.delete('/:id',  controller.delete);

module.exports = router;