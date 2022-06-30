const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => { // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', ''); // извлечём токен
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key'); // попытаемся верифицировать токен
  } catch (err) {
    // отправим ошибку, если не получилось
    return res
      .status(401)
      .send({ message: 'Необходима авторизация' });
  }

  req.user = payload; // мидлвэр добавляет пейлоуд токена в объект запроса

  return next(); // пропускаем запрос дальше
};
