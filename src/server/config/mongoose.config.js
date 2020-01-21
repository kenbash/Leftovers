/* eslint-disable no-param-reassign */
function initialize(mongoose) {
  mongoose.connect(process.env.MONGODB_URI);
  mongoose.Promise = global.Promise;

  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

module.exports = initialize;
