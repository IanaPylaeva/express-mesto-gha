module.exports = (err, req, res, next) => {
  const { errorCode = 500, message } = err;
  res.status(errorCode).send({ message: errorCode === 500 ? 'Ошибка по-умолчанию' : message });

  next(); // если движок дошёл до функции next, он будет искать следующий обработчик того же запроса
};
