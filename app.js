const express = require('express');
const morgan = require('morgan');
const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const tourRouter = require('./routes/tourRoutes');
const userRouter = require('./routes/userRoutes');

const app = express();

// MIDDLEWARES
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// a Middleware to attaches the parsed data to req.body for use in route handlers.
app.use(express.json());

// Here if we wrote a url in the browser and it
// didn't find a route for it in the code it'll
// go and search for it in this 'public' folder
app.use(express.static(`${__dirname}/public`));

// a Middleware to set the request time in the request object
app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// Routes
app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);

// If any request reached here that means it hasn't been seved because there is no router for this request
// all method means for the (get, post, patch, delete and put) requests that didnt find a router
// * stands for everything
app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
  // when an argument is passed to any 'next()' express knows it's an error
  // and then it will skip all the other middlewares and goes to the error handler middleware
});

// a middlehare with 4 paramters is utomatically recognized as an error handler middleware
app.use(globalErrorHandler);

module.exports = app;
