/* eslint-disable no-continue */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const Meal = require('../models/meal.model');

const convertToMeal = meal => (
  {
    id: meal._id,
    name: meal.name,
    servings: meal.servings,
    breakfast: meal.breakfast,
    lunch: meal.lunch,
    dinner: meal.dinner,
    ingredients: meal.ingredients
  }
);

const convertToSimpleMeal = meal => (
  {
    id: meal._id,
    name: meal.name,
    servings: meal.servings,
    breakfast: meal.breakfast,
    lunch: meal.lunch,
    dinner: meal.dinner,
  }
);

const convertToMealName = meal => (
  {
    id: meal._id,
    name: meal.name
  }
);

exports.createMeal = (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    servings: req.body.servings,
    breakfast: req.body.breakfast,
    lunch: req.body.lunch,
    dinner: req.body.dinner,
    ingredients: req.body.ingredients
  });

  meal.save((err, mealRes) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(convertToSimpleMeal(mealRes));
  });
};

exports.getMeal = (req, res) => {
  const { id } = req.params;
  Meal.findById(id, (err, meal) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(convertToMeal(meal));
  });
};

exports.updateMeal = (req, res) => {
  const { id } = req.params;
  Meal.findByIdAndUpdate(id, { $set: req.body }, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.sendStatus(200);
  });
};

exports.deleteMeal = (req, res) => {
  const { id } = req.params;
  Meal.findByIdAndRemove(id, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.sendStatus(200);
  });
};

exports.getAllMeals = (req, res) => {
  Meal.find({}, (err, meals) => res.send(meals.map(convertToSimpleMeal)));
};

exports.getMealPlan = async (req, res) => {
  const meals = Array.from({ length: 7 }, () => ({ breakfast: null, lunch: null, dinner: null }));
  let curDay = 0;

  while (curDay < 7) {
    // set conditions for needed time of day and servings
    const days = [];
    if (!meals[curDay].breakfast) days.push({ breakfast: true });
    if (!meals[curDay].lunch) days.push({ lunch: true });
    if (!meals[curDay].dinner) days.push({ dinner: true });
    const conditions = { servings: { $lte: 7 - curDay }, $or: days };

    // if no possible meals found, exit
    const mealCount = await Meal.countDocuments(conditions);
    if (mealCount < 1) break;

    // select next random meal
    const meal = await Meal.findOne(conditions).skip(Math.floor(Math.random() * mealCount));
    let leftovers = meal.servings;

    // fill in meal plan with chosen meal
    for (let i = curDay; i < 7 && leftovers > 0; i += 1) {
      if (!meals[i].breakfast && meal.breakfast) {
        meals[i].breakfast = convertToMealName(meal);
      } else if (!meals[i].lunch && meal.lunch) {
        meals[i].lunch = convertToMealName(meal);
      } else if (!meals[i].dinner && meal.dinner) {
        meals[i].dinner = convertToMealName(meal);
      } else {
        continue;
      }

      leftovers -= 1;

      if (meals[i].breakfast && meals[i].lunch && meals[i].dinner) {
        curDay = i + 1;
      }
    }
  }

  res.send(meals);
};
