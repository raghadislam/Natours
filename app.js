const express = require('express');
const morgan = require('morgan');
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

module.exports = app;
