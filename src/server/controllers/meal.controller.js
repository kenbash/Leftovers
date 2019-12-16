/* eslint-disable no-underscore-dangle */
const Meal = require('../models/meal.model');

const convertToDTO = meal => ({ id: meal._id, name: meal.name, servings: meal.servings });

exports.createMeal = (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    servings: req.body.servings
  });

  meal.save((err, mealRes) => {
    if (err) {
      console.error(err);
      return;
    }
    res.send(convertToDTO(mealRes));
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

exports.getAllMeals = (req, res) => {
  Meal.find({}, (err, meals) => res.send(meals.map(convertToDTO)));
};

exports.getMealPlan = (req, res) => {
  // const promises = new Array(7);
  // Meal.count({}, (err, count) => {
  //     var rand = Math.floor(Math.random() * count);
  //     Meal.findOne(skip(random), exec()
  //   }
  // )
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
