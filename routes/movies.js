const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const urlRegex = require('../utils/constants');
const {
  getMovies, deleteMovie, addMovie,
} = require('../controllers/movies');

router.get('/', getMovies);

router.delete('/:_id', celebrate({
  params: Joi.object().keys({
    _id: Joi.string().length(24).hex().required(),
  }),
}), deleteMovie);

router.post('/', celebrate({
  body: Joi.object().keys({
    movieId: Joi.number().min(1).max(99999).required(),
    country: Joi.string().min(1).max(99).required(),
    director: Joi.string().min(1).max(99).required(),
    duration: Joi.number().max(99999).required(),
    year: Joi.number().min(2).max(99999).required(),
    description: Joi.string().min(1).max(99999).required(),
    image: Joi.string().pattern(urlRegex).required(),
    trailerLink: Joi.string().pattern(urlRegex).required(),
    name: {
      'en-UK': Joi.string().min(1).max(99).required(),
      ru: Joi.string().min(1).max(99).required(),
      es: Joi.string().min(1).max(99),
    },
    thumbnail: Joi.string().pattern(urlRegex).required(),
    owner: Joi.string().required(),
  }),
}), addMovie);

module.exports = router;
