const express = require('express');
const passport = require('passport');
const controller = require('../controllers/user');
const router = express.Router();

// api/auth/login
router.get('/:email', controller.getByEmail);
router.patch('/:id', passport.authenticate('jwt', {session: false}), controller.update);

module.exports = router;