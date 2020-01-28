const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');
const MongoStore = require('connect-mongo')(session);

if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require, import/no-extraneous-dependencies
  require('dotenv').config({ path: require('path').resolve(__dirname, '.env') });
}

const initMongoose = require('./config/mongoose.config');
const initPassport = require('./config/passport.config');

initMongoose(mongoose);
initPassport(passport);

const app = express();
app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

const meal = require('./routes/meal.route');
const user = require('./routes/user.route');

app.use('/api/meal', meal);
app.use('/api/user', user);

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Listening on port ${port}!`));
