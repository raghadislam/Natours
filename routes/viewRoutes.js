const express = require('express');
const viewController = require('../controllers/viewController');
const authController = require('../controllers/authController');
const bookingController = require('../controllers/bookingController');

const router = express.Router();

router.get(
  '/',
  bookingController.createBookingCheckout,
  authController.isLoggedin,
  viewController.getOverview,
);
router.get('/tour/:slug', authController.isLoggedin, viewController.getTour);
router.get('/login', authController.isLoggedin, viewController.getLoginForm);
router.get('/me', authController.protect, viewController.getAccount);

module.exports = router;
