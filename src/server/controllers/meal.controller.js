const Meal = require('../models/meal.model');

exports.createMeal = (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    servings: req.body.servings
  });

  meal.save((err) => {
    if (err) {
      console.error(err);
      return;
    }
    res.sendStatus(200);
  });
};

exports.getMeal = (req, res) => {
  const { id } = req.params;
  Meal.findById(id, (err, meal) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(meal);
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

exports.getMealPlan = (req, res) => {
  // TODO, in model? read mongoose doc
  const meals = [];
  for (let i = 1; i <= 7; i += 1) {
    meals.push({
      breakfast: {
        name: `breakfast${i}`,
        servings: i % 10
      },
      lunch: {
        name: `lunch${i}`,
        servings: i % 10
      },
      dinner: {
        name: `dinner${i}`,
        servings: i % 10
      }
    });
  }
  res.send(meals);
};

exports.getAllMeals = (req, res) => {
  // TODO: use mongoose getAll
  const meals = [];
  for (let i = 1; i <= 15; i += 1) {
    meals.push({ name: `meal${i}`, servings: i % 10 });
  }
  res.send(meals);
};
