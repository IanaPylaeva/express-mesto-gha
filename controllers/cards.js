const Card = require('../models/card');
const { IncorrectDataError } = require('../Error/IncorrectDataError'); // 400 ошибка
const { NotFoundError } = require('../Error/NotFoundError'); // 404 ошибка

/* Получить все карточки */
module.exports.getAllCards = (req, res, next) => Card.find({})
  .then((cards) => res.status(200).send({ data: cards }))
  .catch(next);

/* Создать карточку */
module.exports.createCard = async (req, res, next) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  try {
    const card = await Card.create({ name, link, owner: _id });
    res.status(200).send(card);
  } catch (error) {
    if (error.name === 'IncorrectDataError') {
      next(new IncorrectDataError('Переданы некорректные данные'));
    } else {
      next(error);
    }
  }
};

/* Удалить карточку */
module.exports.deleteCard = (req, res, next) => {
  const { cardId } = req.params;

  Card.findByIdAndRemove(cardId)
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      card.remove();
      res.status(200).send({ data: card });
    })
    .catch(next);
};

/* Поставить лайк на карточку */
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const { _id } = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $addToSet: { likes: _id }, // добавить _id в массив, если его там нет
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'IncorrectDataError') {
        next(new IncorrectDataError('Переданы некорректные данные карточки для постановки лайка'));
      } else {
        next(error);
      }
    });
};

/* Удалить лайк с карточки */
module.exports.likeCard = (req, res, next) => {
  const { cardId } = req.params;
  const _id = req.user;
  Card.findByIdAndUpdate(
    cardId,
    {
      $pull: { likes: _id }, // убрать _id из массива
    },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        throw new NotFoundError('Карточка с указанным _id не найдена');
      }
      res.status(200).send(card);
    })
    .catch((error) => {
      if (error.name === 'IncorrectDataError') {
        next(new IncorrectDataError('Переданы некорректные данные карточки для снятия лайка'));
      } else {
        next(error);
      }
    });
};
