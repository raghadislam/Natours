const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

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
  role: {
    type: String,
    enum: ['user', 'guide', 'lead-guide', 'admin'],
    default: 'user',
  },
  password: {
    type: String,
    required: [true, 'A user must have a password'],
    minlength: [8, 'A paswword must have at least 8 characters'],
    select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Pleas confirm the password'],
    validate: {
      // This only works on SAVE and CEATE
      validator: function (el) {
        return el === this.password;
      },
      message: 'Confirmed password is not the same as Password!',
    },
  },
  passwordChangedAt: Date,
});

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword,
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimeStamp) {
  if (this.passwordChangedAt) {
    const passwordChangeTimeStamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10,
    );
    console.log(passwordChangeTimeStamp, JWTTimeStamp);

    return passwordChangeTimeStamp > JWTTimeStamp;
  }
  return false;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
