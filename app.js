const path = require('path');
const bodyParser = require('body-parser');
const express = require('express'); //подключаем express
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env; //порт, на котором будет запуск express-сервера
const app = express();
const usersRoute = require('./routes/users');
const cardsRoute = require('./routes/cards');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use((req, res, next) => {
  req.user = {
    _id: '62a3c17845a8e18b011de161' // _id созданного тестового пользователя
  };

  next();
});

app.use(usersRoute);
app.use(cardsRoute);

app.use(express.static(path.join(__dirname, 'public'))); // теперь клиент имеет доступ только к публичным файлам

// Слушаем 3000 порт
app.listen(PORT);

/*

_id
62a3c17845a8e18b011de161
name
"Тестовый пользователь"
about
"Информация о себе"
avatar
"http://risovach.ru/upload/2014/06/mem/mne-kazhetsya-ili-frai-futurama_…"
__v
0
*/