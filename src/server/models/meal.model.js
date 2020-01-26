const mongoose = require('mongoose');
// const validator = require('validator');
const MealDTO = require('./meal.dto');

const MealSchema = new mongoose.Schema({
  name: { type: String, required: true },
  servings: { type: Number, required: true },
  breakfast: { type: Boolean, required: true },
  lunch: { type: Boolean, required: true },
  dinner: { type: Boolean, required: true },
  ingredients: { type: [String], required: true },
  user_id: { type: String, required: true, index: true }
});

MealSchema.statics.generateMealPlan = async function func(user) {
  const meals = Array.from({ length: 7 }, () => ({ breakfast: null, lunch: null, dinner: null }));
  const ingredients = [];
  let curDay = 0;

  while (curDay < 7) {
    // set conditions for needed time of day and servings
    const days = [];
    if (!meals[curDay].breakfast) days.push({ breakfast: true });
    if (!meals[curDay].lunch) days.push({ lunch: true });
    if (!meals[curDay].dinner) days.push({ dinner: true });
    const conditions = { user_id: user, servings: { $lte: 7 - curDay }, $or: days };

    // if no possible meals found, try next day
    const mealCount = await this.countDocuments(conditions);
    if (mealCount < 1) {
      curDay += 1;
      continue;
    }

    // select next random meal
    const meal = await this.findOne(conditions).skip(Math.floor(Math.random() * mealCount));
    let leftovers = meal.servings;
    ingredients.push(...meal.ingredients);

    // fill in meal plan with chosen meal
    for (let i = curDay; i < 7 && leftovers > 0; i += 1) {
      if (!meals[i].breakfast && meal.breakfast) {
        meals[i].breakfast = MealDTO.convertToMealName(meal);
      } else if (!meals[i].lunch && meal.lunch) {
        meals[i].lunch = MealDTO.convertToMealName(meal);
      } else if (!meals[i].dinner && meal.dinner) {
        meals[i].dinner = MealDTO.convertToMealName(meal);
      } else {
        continue;
      }

      leftovers -= 1;

      if (meals[i].breakfast && meals[i].lunch && meals[i].dinner) {
        curDay = i + 1;
      }
    }
  }

  ingredients.sort();

  return { meals, ingredients };
};

module.exports = mongoose.model('Meal', MealSchema);
