const Tour = require('../models/tourModel');

exports.getAllTours = async (req, res) => {
  try {
    // BUILD A QUERY
    // 1) Filtering

    // making shallow copy and not a hard copy
    const queryObj = { ...req.query };

    // these are exluded because are not queries, they have a special functionality
    const execludeFields = [
      'page',
      'sort',
      'limit',
      'fields',
    ];
    execludeFields.forEach(
      (el) => delete queryObj[el],
    );

    // Advanced Filtering
    let queryStr = JSON.stringify(queryObj);

    queryStr = queryStr.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`,
    );

    let query = Tour.find(JSON.parse(queryStr));

    // 2) Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort
        .split(',')
        .join(' ');

      query = query.sort(sortBy);
    } else {
      // adding a default sorting
      query = query.sort('createdAt _id');
    }

    // 3) Field Limiting
    if (req.query.fields) {
      const fields = req.query.fields
        .split(',')
        .join(' ');

      query = query.select(fields);
    } else {
      query.select('-__v'); // the - means execluding this argument
    }

    // 4) Pagination
    const page = req.query.page * 1 || 1;
    const limit = req.query.limit * 1 || 100;
    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(limit);

    if (req.query.page) {
      const toursNum =
        await Tour.countDocuments();
      if (skip >= toursNum)
        throw new Error(
          'This page does not exist',
        );
    }

    // EXECUTE THE QUERY
    const allTours = await query;

    // SEND RESPONSE
    res.status(200).json({
      status: 'success',
      results: allTours.length,
      data: {
        allTours,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.createTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tours: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: 'Invalid Data Sent',
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(
      req.params.id,
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
  // const id = req.params.id * 1;
  // const tour = tours.find((el) => el.id === id);
};
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true, // return the updated and not the original
        runValidators: true, // the validators (type validators for example), runs again after updating
      },
    );
    res.status(200).json({
      status: 'success',
      data: {
        tour, // this is the same is this: tour: tour
      },
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      data: null,
    });
  } catch (err) {
    res.status(404).json({
      status: 'fail',
      message: err,
    });
  }
};
