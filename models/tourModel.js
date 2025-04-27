const mongoose = require('mongoose');
const slugify = require('slugify');
// const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A tour must have a name'],
      unique: true,
      trim: true,
      maxlength: [40, 'A tour name must have at most 40 characters'],
      minlength: [5, 'A tour name must have at least 5 characters'],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, 'A tour must have a duration'],
    },
    maxGroupSize: {
      type: Number,
      required: [true, 'A tour must have a maximum group size'],
    },
    difficulty: {
      type: String,
      required: [true, 'A tour must have a difficulty'],
      enum: {
        // enum is only fir strings
        values: ['easy', 'medium', 'difficult'],
        message: 'difficulty must be either easy, medium, or difficult',
      },
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    ratingsAverage: {
      type: Number,
      default: 4.5, // min and max works for numbers and dates
      min: [1, 'Rating must be greater than or equal 1'],
      max: [5, 'Rating must be less than or equal 5'],
    },
    price: {
      type: Number,
      required: [true, 'A tour must have a price'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // this only points to current document on new document creation
          return val < this.price;
        },
        message: 'Discount price ({VALUE}) must be below regular price',
      },
    },
    summary: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a summary'],
    },
    description: {
      type: String,
      trim: true,
      required: [true, 'A tour must have a description'],
    },
    imageCover: {
      type: String,
      required: [true, 'A tour must have a cove image'],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(), // in mongo this will be converted into todays date
      select: false, // hide this one from the output
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, // because of these two there is id field added
  },
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

// DOCUMENT MIDDLEWARE, this one runs before the .save() and .create() commands only
// 'this' points to the current document
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.post('save', (doc, next) => {
//   console.log(doc);
//   next();
// });

// QUERY MIDDLEWARE, this one runs before any query begins with find because of the regular exp
// 'this' points to the current query
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });
  this.startTime = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  // console.log(
  //   ` the time taken by the query is: ${Date.now() - this.startTime}`,
  // );
  // console.log(docs);
  next();
});

// AGGREGATION MIDDLEWARE
// 'this' points to the current aggrigation object
tourSchema.pre('aggregate', function (next) {
  // unshift adds to the beginning of the array
  this.pipeline().unshift({
    $match: { secretTour: { $ne: true } },
  });
  // console.log(this.pipeline());
  next();
});

const Tour = mongoose.model('Tour', tourSchema);
// Mongoose automatically converts it into a lowercase, plural collection name in MongoDB.

module.exports = Tour;
