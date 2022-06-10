const router = require('express').Router();

const { getAllUsers, getUserId, createUser } = require('../controllers/user');

router.get('/users', getAllUsers); //возвращает всех пользователей
router.get('/users/:userId', getUserId); //возвращает пользователя по _id
router.post('/users', createUser); //создаёт пользователя

module.exports = router;