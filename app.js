const express = require('express');

const app = express();

const mongoose = require('mongoose');

const bodyParser = require('body-parser');

const { PORT = 3000 } = process.env;

const { login, createUser } = require('./controllers/users');

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/*
app.use((req, res, next) => {
  req.user = {
    _id: '62a3c17845a8e18b011de161', // _id созданного тестового пользователя
  };

  next();
});
*/

app.post('/signin', login);
app.post('/signup', createUser);

app.use('/', require('./routes/users'));
app.use('/', require('./routes/cards'));

app.use('*', (req, res) => {
  res.status(404).send({ message: 'Страницы не существует' });
});

// Слушаем 3000 порт
app.listen(PORT);
