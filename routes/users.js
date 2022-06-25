const router = require('express').Router();

const {
  getAllUsers,
  getUserId,
  createUser,
  updateUser,
  updateAvatar,
} = require('../controllers/users');

router.get('/users', getAllUsers); // возвращает всех пользователей
router.get('/users/:userId', getUserId); // возвращает пользователя по _id
router.get('/users/me', getUserInfo); // возвращает информацию о текущем пользователе
router.post('/users', createUser); // создаёт пользователя
router.patch('/users/me', updateUser); // обновляет профиль
router.patch('/users/me/avatar', updateAvatar); // обновляет аватар

module.exports = router;
