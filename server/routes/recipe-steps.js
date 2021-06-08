const express = require('express');
const passport = require('passport');

const controller = require('../controllers/recipe-steps');
const upload = require('../middleware/upload');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:recipeId', controller.getByRecipeId);
router.post('/', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.create);
router.patch('/:id', passport.authenticate('jwt', {session: false}), upload.single('image'), controller.update);
router.delete('/:id',  controller.delete);

module.exports = router;