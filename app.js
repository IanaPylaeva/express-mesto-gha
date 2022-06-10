const express = require('express'); //подключаем express
const mongoose = require('mongoose');
const userRoute = require('.routes/user');

const { PORT = 3000 } = process.env; //порт, на котором будет запуск express-сервера

const app = express();

app.use(userRoute);

mongoose.connect('mongodb://localhost:27017/mestodb');

// Слушаем 3000 порт
app.listen(PORT, () => {
    // Если всё работает, консоль покажет, какой порт приложение слушает
    console.log(`App listening on port ${PORT}`)
})
