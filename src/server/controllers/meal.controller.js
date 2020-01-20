const Meal = require('../models/meal.model');
const MealDTO = require('../models/mealDTO');

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
      res.sendStatus(500);
      return;
    }

    res.send(MealDTO.convertToSimpleMeal(mealRes));
  });
};

exports.getMeal = (req, res) => {
  const { id } = req.params;
  Meal.findById(id, (err, meal) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    if (!meal) {
      res.sendStatus(404);
      return;
    }

    res.send(MealDTO.convertToMeal(meal));
  });
};

exports.updateMeal = (req, res) => {
  const { id } = req.params;
  const { body: meal } = req;

  Meal.findByIdAndUpdate(id, meal, (err) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
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
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

exports.getAllMeals = (_req, res) => {
  Meal.find({}, (err, meals) => {
    if (err) {
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.send(meals.map(MealDTO.convertToSimpleMeal));
  });
};

exports.getMealPlan = async (_req, res) => {
  const meals = Array.from({ length: 7 }, () => ({ breakfast: null, lunch: null, dinner: null }));
  const ingredients = [];
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

  res.send({ meals, ingredients });
};
