const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A user must have a name'],
    trim: true,
    maxlength: [40, 'A user name must have at most 40 characters'],
    minlength: [3, 'A user name must have at least 3 characters'],
  },
  email: {
    type: String,
    required: [true, 'A user must an email'],
    unique: true,
    trim: true,
    maxlength: [50, 'A user name must have at most 50 characters'],
    minlength: [7, 'A user name must have at least 7 characters'],
    lowercase: true,
    validate: [validator.isEmail, 'Please provide a valid Email!'],
  },
  photo: String,
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'A paswword must have at least 8 characters'],
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Pleas confirm the password'],
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
