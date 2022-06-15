const User = require('../models/user');

/* Создать пользователя */
module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(200).send({ data:user });
    })
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при создании пользователя' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

/* Получить всех пользователей */
module.exports.getAllUsers = (req, res) => {
  User.find({})
    .then((users) => res.status(200).send(users))
    .catch(() => res.status(500).send({ message: 'Произошла ошибка' }));
};

/* Получить о пользователе информацию */
module.exports.getUserId = (req, res) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (!user) {
        res.status(404).send({ message: 'Пользователь по указанному _id не найден' });
        return;
      }
      res.status(200).send(user);
    })
    .catch((error) => {
      if (error.name === 'CastError') {
        res.status(404).send({ message: 'Некорректный id пользователя' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

/* Обновить информацию о пользователе */
module.exports.updateUser = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении профиля' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};

/* Обновить аватар пользователя */
module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, {
    new: true, // обработчик then получит на вход обновлённую запись
    runValidators: true, // данные будут валидированы перед изменением
  })
    .then((user) => res.status(200).send(user))
    .catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send({ message: 'Переданы некорректные данные при обновлении аватара' });
        return;
      }
      res.status(500).send({ message: 'Произошла ошибка' });
    });
};
