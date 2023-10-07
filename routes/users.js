const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  editUserData, getMeUser,
} = require('../controllers/users');

router.get('/me', getMeUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required(),
  }),
}), editUserData);

module.exports = router;
