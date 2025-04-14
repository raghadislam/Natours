// this file is for application setup
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const app = require('./app');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace(
  '<DB_PASSWORD>',
  process.env.DATABASE_PASSWORD,
);

/* connect to the database */
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB conneted!'));

// const testTour = new Tour({
//   name: 'Raghad',
//   price: 997,
// });

// testTour
//   .save()
// .then((doc) => {
//   console.log(doc);
// })
// .catch((err) => {
//   console.log(err);
// });

// start the server
// console.log(app.get('env'));
// console.log(process.env);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`App is Running on Port ${port}`);
});
