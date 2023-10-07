const mongoose = require('mongoose');
const DICTIONARY = require('../utils/dictionary');
const urlRegex = require('../utils/constants');

const currentLang = 'ru';
const dict = DICTIONARY[currentLang];

const movieSchema = new mongoose.Schema({
  country: {
    type: mongoose.Schema.Types.String,
    required: [true, dict.shouldBeFilled],
  },
  director: {
    type: mongoose.Schema.Types.String,
    required: [true, dict.shouldBeFilled],
  },
  duration: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  year: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.Number,
    required: true,
  },
  image: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введите url адрес',
    },
    required: true, //
  },
  trailerLink: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введите url адрес',
    },
    required: true, //
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введите url адрес',
    },
    required: true, //
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true, //
  },
  nameEN: {
    type: String,
    required: [true, dict.required()],
  },
  nameRU: {
    type: String,
    required: [true, dict.required()],
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
