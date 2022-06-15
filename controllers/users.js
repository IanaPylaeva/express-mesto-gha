const User = require('../models/user');
const { IncorrectDataError } = require('../Error/IncorrectDataError'); // 400 ошибка
const { NotFoundError } = require('../Error/NotFoundError'); // 404 ошибка

/* Создать пользователя */
module.exports.createUser = async (req, res, next) => {
  const { name, about, avatar } = req.body;
  try {
    const user = await User.create({ name, about, avatar });
    res.status(200).send(user);
  } catch (error) {
    if (error.name === 'IncorrectDataError') {
      next(new IncorrectDataError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};

/* Получить всех пользователей */
module.exports.getAllUsers = (req, res, next) => User.find({})
  .then((users) => res.status(200).send({ data: users }))
  .catch(next);

/* Получить о пользователе информацию */
module.exports.getUserId = async (req, res, next) => {
  try {
    const user = await User.findById(req.params._id);
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send({ data: user });
  } catch (error) {
    if (error.name === 'IncorrectDataError') {
      next(new IncorrectDataError('Некорректный id пользователя'));
    } else {
      next(error);
    }
  }
};

/* Обновить информацию о пользователе */
module.exports.updateUser = async (req, res, next) => {
  const { _id } = req.user;
  const { name, about } = req.body;
  try {
    const user = await User.findByIdAndUpdate(_id, { name, about });
    if (!user) {
      throw new NotFoundError('Пользователь по указанному _id не найден');
    }
    res.status(200).send({ data: user });
  } catch (error) {
    if (error.name === 'IncorrectDataError') {
      next(new IncorrectDataError('Некорректныe данные пользователя'));
    } else {
      next(error);
    }
  }
};

/* Обновить аватар пользователя */
module.exports.updateAvatar = (req, res, next) => {
  const { _id } = req.user;
  const { avatar } = req.body;
  User.findByIdAndUpdate(_id, { avatar })
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь по указанному _id не найден');
      }
      res.status(200).send({ data: user });
    })
    .catch((error) => {
      if (error.name === 'IncorrectDataError') {
        next(new IncorrectDataError('Некорректный id пользователя'));
      } else {
        next(error);
      }
    });
};
