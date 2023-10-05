const { HTTP_STATUS_OK, HTTP_STATUS_CREATED } = require('http2').constants; // 200/201
const mongoose = require('mongoose');
const Movie = require('../models/movie');

const BadRequestError = require('../errors/BadRequestError');
const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.addMovie = async (req, res, next) => {
  const {
    name, movieId, country, director, duration, year, description, image, trailerLink, thumbnail,
  } = req.body;
  try {
    const movie = await Movie.create({
      name,
      owner: req.user._id,
      movieId,
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
    });
    res.status(HTTP_STATUS_CREATED).send(movie); // 201
  } catch (err) {
    if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError(err.message));
    } else {
      next(err);
    }
  }
};

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .then((movies) => res.status(HTTP_STATUS_OK).send(movies))
    .catch(next);
};

module.exports.deleteMovie = async (req, res, next) => {
  try {
    const movie = await Movie.findById(req.params._id)
      .orFail();
    if (!movie.owner.equals(req.user._id)) {
      throw new ForbiddenError('Фильм другого пользователя');// 403
    }
    await Movie.deleteOne(movie)
      .orFail();
    res.status(HTTP_STATUS_OK).send({ message: `Фильм удален, id: ${req.params._id} ` });
  } catch (err) {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError(`Фильм по указанному id: ${req.params._id} не найден`));// 404
    } else if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError(`Некоректный id: ${req.params._id} фильма`));// 400
    } else {
      next(err);
    }
  }
};
