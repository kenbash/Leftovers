const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const meal = require('./routes/meal.route');

// Configuration (move later)
const port = process.env.PORT || 8080;
const mongoDB = process.env.MONGODB_URI || 'mongodb://localhost:27017/leftovers';

const app = express();

// Database connection
mongoose.connect(mongoDB);
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// app.use(express.static('dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/meal', meal);

app.listen(port, () => console.log(`Listening on port ${port}!`));
