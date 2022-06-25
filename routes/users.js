const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  getAllUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
  getUserInfo,
} = require('../controllers/users');

router.get('/users', getAllUsers); // возвращает всех пользователей
router.get('/users/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().alphanum().required(),
  }),
}), getUserId); // возвращает пользователя по _id
router.get('/users/me', getUserInfo); // возвращает информацию о текущем пользователе
router.post('/users', createUser); // создаёт пользователя
router.patch('/users/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser); // обновляет профиль
router.patch('/users/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .pattern(/http[s]?:\/\/(www.)?[-a-zA-Z0-9._~:/?@!&'()*+,;=#]/).required(),
  }),
}), updateAvatar); // обновляет аватар

module.exports = router;
