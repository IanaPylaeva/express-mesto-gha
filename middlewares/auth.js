const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/authorization-error'); // код 401

module.exports = (req, res, next) => { // достаём авторизационный заголовок
  const { authorization } = req.headers;

  // убеждаемся, что он есть или начинается с Bearer
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new AuthorizationError('Необходима авторизация'));
  }

  const token = authorization.replace('Bearer ', ''); // извлечём токен
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key'); // попытаемся верифицировать токен
  } catch (err) {
    // отправим ошибку, если не получилось
    return next(new AuthorizationError('Необходима авторизация'));
  }

  req.user = payload; // мидлвэр добавляет пейлоуд токена в объект запроса

  return next(); // пропускаем запрос дальше
};
