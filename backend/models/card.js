const mongoose = require('mongoose');
// const validator = require('validator');

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: [2, 'Минимум 2 знака'],
    maxLength: [30, 'Максимум 30 знаков'],
    required: [true, 'Поле обязательно к заполнению'],
  },
  link: {
    type: String,
    required: [true, 'Поле обязательно к заполнению'],
    validate: {
      validator: (url, helpers) => {
        const regex = /^((http|https):\/\/)?(www\.)?([A-Za-zА-Яа-я0-9]{1}[A-Za-zА-Яа-я0-9\\-]*\.?)*\.{1}[A-Za-zА-Яа-я0-9-]{2,8}(\/([\w#!:.?+=&%@!\-\\/])*)?/g;
        if (!regex.test(url)) {
          return helpers.error('Некорректный URL');
        }
        return url;
      },
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'user',
    default: [{ _id: {} }],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
