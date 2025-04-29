const User = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUsers = catchAsync(async (req, res) => {
  const allUser = await User.find();

  // SEND RESPONSE
  res.status(200).json({
    status: 'success',
    results: allUser.length,
    data: {
      allUser,
    },
  });
});

exports.getUser = (req, res) => {
  res.status(500).json({
    // 500 means internal server error
    status: 'error',
    message: 'this route is not yet defined',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    // 500 means internal server error
    status: 'error',
    message: 'this route is not yet defined',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    // 500 means internal server error
    status: 'error',
    message: 'this route is not yet defined',
  });
};

exports.deleteUser = (req, res) => {
  res.status(500).json({
    // 500 means internal server error
    status: 'error',
    message: 'this route is not yet defined',
  });
};
