const mongoose = require('mongoose'); //Зададим схему для пользователя через Mongoose

const userSchema = new mongoose.Schema({
  name: {// у пользователя есть имя — опишем требования к имени в схеме:
    type: String,// имя — это строка
    required: true,// оно должно быть у каждого пользователя, так что имя — обязательное поле
    minlength: 2,// минимальная длина имени — 2 символа
    maxlength: 30,// а максимальная — 30 символов
  },
  about : {
    type: String,// это строка
    required: true,// обязательное поле
    minlength: 2,// минимальная длина  — 2 символа
    maxlength: 30,// а максимальная — 30 символов
  },
  avatar : {
    type: String,// это строка
    required: true,// обязательное поле
  },
});

module.exports = mongoose.model('user', userSchema);