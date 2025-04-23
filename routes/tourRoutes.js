const express = require('express');
const tourController = require('../controllers/tourController');

const router = express.Router();

// this is how we define paramterized middleware that only
// get exuted when we rout for a url with these specific parameters
// router.param('id', tourController.checkId);

router
  .route('/top-5-cheap')
  .get(
    tourController.aliasTopTours,
    tourController.getAllTours,
  );

router.route('/stats').get(tourController.getTourStats);
router
  .route('/monthly-plan/:year')
  .get(tourController.getMonthlyPlan);

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
