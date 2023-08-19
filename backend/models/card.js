const mongoose = require('mongoose');
const regexUrl = require('../utils/regexUrl');

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
      // eslint-disable-next-line arrow-body-style
      validator: (v) => {
        return regexUrl.test(v);
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
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false });

module.exports = mongoose.model('card', cardSchema);
