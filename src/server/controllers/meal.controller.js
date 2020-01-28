const Meal = require('../models/meal.model');
const MealDTO = require('../models/meal.dto');

exports.createMeal = (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    servings: req.body.servings,
    breakfast: req.body.breakfast,
    lunch: req.body.lunch,
    dinner: req.body.dinner,
    ingredients: req.body.ingredients,
    user_id: req.user._id
  });

  meal.save((err, mealRes) => {
    if (err) {
      res.sendStatus(403);
      return;
    }

    res.send(MealDTO.convertToSimpleMeal(mealRes));
  });
};

exports.getMeal = (req, res) => {
  const { id } = req.params;

  Meal.findById(id, (err, meal) => {
    if (err) {
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
      res.sendStatus(403);
      return;
    }

    res.sendStatus(200);
  });
};

exports.deleteMeal = (req, res) => {
  const { id } = req.params;
  Meal.findByIdAndRemove(id, (err) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.sendStatus(200);
  });
};

exports.getAllMeals = (req, res) => {
  const user = req.isAuthenticated() ? req.user._id : 'example';

  Meal.find({ user_id: user }, (err, meals) => {
    if (err) {
      res.sendStatus(500);
      return;
    }

    res.send(meals.map(MealDTO.convertToSimpleMeal));
  });
};

exports.getMealPlan = async (req, res) => {
  try {
    const user = req.isAuthenticated() ? req.user._id : 'example';
    const mealPlan = await Meal.generateMealPlan(user);

    res.send(mealPlan);
  } catch {
    res.sendStatus(500);
  }
};
