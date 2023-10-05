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
    type: mongoose.Schema.Types.Number, // String,
    required: true,
  },
  description: {
    type: mongoose.Schema.Types.String,
    required: true,
  },
  movieId: {
    type: mongoose.Schema.Types.Number,
    ref: 'user',
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
  },
  trailerLink: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введите url адрес',
    },
  },
  thumbnail: {
    type: String,
    validate: {
      validator(v) {
        return urlRegex.test(v);
      },
      message: 'Введите url адрес',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  name: {
    'en-UK': {
      type: String,
      required: [true, dict.required()],
      minlength: [1, dict.minlength()],
      maxlength: [99, dict.maxlength()],
    },
    ru: {
      type: String,
      required: [true, dict.required()],
      minlength: [1, dict.minlength()],
      maxlength: [99, dict.maxlength()],
    },
    es: {
      type: String,
      minlength: [1, dict.minlength()],
      maxlength: [99, dict.maxlength()],
    },
  },
}, { versionKey: false });

module.exports = mongoose.model('movie', movieSchema);
