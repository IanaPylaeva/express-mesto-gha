const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const helmet = require('helmet');

const { PORT = 3000 } = process.env;

const { celebrate, Joi } = require('celebrate');

const auth = require('./middlewares/auth');

const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(/^https?:\/\/(www\.)?[a-zA-Z\d-]+\.[\w\d\-._~:/?#[\]@!$&'()*+,;=]{2,}#?$/),
  }),
}), createUser);

app.use(auth);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

// Слушаем 3000 порт
app.listen(PORT);
