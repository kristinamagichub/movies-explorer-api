const express = require('express');
const auth = require('../middlewares/auth');
const NotFoundError = require('../errors/NotFoundError');
const signin = require('./signin');
const signup = require('./signup');
const users = require('./users');
const movies = require('./movies');

const router = express.Router();

router.use('/signin', signin);
router.use('/signup', signup);

router.use(auth);

router.use('/users', users);
router.use('/movies', movies);

router.get('*', (req, res, next) => {
  next(new NotFoundError('страница не найдена'));
});

module.exports = router;
