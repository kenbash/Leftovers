const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
// const passportLocal = require('passport-local');
// const session = require('express-session');

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
}

const initPassport = require('./config/passport.config');

initPassport(passport);

const meal = require('./routes/meal.route');
// const user = require('./routes/user.route');

const app = express();

// Database connection (move to config?)
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/leftovers';
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('dist'));
}

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(session({
//   secret: process.env.SESSION_SECRET,
//   resave: false,
//   saveUninitialized: false
// }));

app.use('/api/meal', meal);
// app.use('/api/user', user);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
