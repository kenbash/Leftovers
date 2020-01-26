const mongoose = require('mongoose');
// const validator = require('validator');

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  servings: { type: Number, required: true },
  breakfast: { type: Boolean, required: true },
  lunch: { type: Boolean, required: true },
  dinner: { type: Boolean, required: true },
  ingredients: { type: [String], required: true },
  user_id: { type: String, required: true, index: true }
});

module.exports = mongoose.model('Meal', MealSchema);
