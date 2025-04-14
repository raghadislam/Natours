const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// this is how we define paramterized middleware that only
// get exuted when we rout for a url with these specific parameters
// router.param('id', tourController.checkId);

router
  .route('/')
  .get(tourController.getAllTours)
  .post(tourController.createTour);
router
  .route('/:id')
  .get(tourController.getTour)
  .patch(tourController.updateTour)
  .delete(tourController.deleteTour);

module.exports = router;
