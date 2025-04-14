const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A tour must have a name'],
    unique: true,
    trim: true, // remove white spaces from the begeining and the end
  },
  duration: {
    type: Number,
    required: [
      true,
      'A tour must have a duration',
    ],
  },
  maxGroupSize: {
    type: Number,
    required: [
      true,
      'A tour must have a maximum group size',
    ],
  },
  difficulty: {
    type: String,
    required: [
      true,
      'A tour must have a difficulty',
    ],
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  price: {
    type: Number,
    required: [true, 'A tour must have a price'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
  },
  description: {
    type: String,
    trim: true,
    required: [
      true,
      'A tour must have a description',
    ],
  },
  imageCover: {
    type: String,
    required: [
      true,
      'A tour must have a cove image',
    ],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(), // in mongo this will be converted into todays date
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);
// Mongoose automatically converts it into a lowercase, plural collection name in MongoDB.

module.exports = Tour;
