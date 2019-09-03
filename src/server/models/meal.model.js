const mongoose = require('mongoose');
// const validator = require('validator');

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  servings: { type: Number, required: true }
});

module.exports = mongoose.model('Meal', MealSchema);
