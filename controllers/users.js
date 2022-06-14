const User = require('../models/user');

/* Создать пользователя */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

/* Получить всех пользователей */
module.exports.getAllUsers = (req, res) => User.find({})
  .then(users => res.send({ data: users }))
  .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));

/* Получить о пользователе информацию */
module.exports.getUserId = (req, res) => User.findById(req.params.id)
  .then(user => res.send({ data: user }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));

/* Обновить информацию о пользователе */
module.exports.updateUser = (req, res) => {
  const { _id } = req.params;
  const { name, about } = req.body;
  User.findByIdAndUpdate(_id, { name, about })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};

/* Обновить аватар пользователя */
module.exports.updateAvatar = (req, res) => {
  const { _id } = req.params;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar })
    .then(user => res.send({ data: user }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
};