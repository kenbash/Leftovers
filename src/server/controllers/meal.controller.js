/* eslint-disable no-await-in-loop */
/* eslint-disable no-underscore-dangle */
const Meal = require('../models/meal.model');

const convertToDTO = meal => (
  {
    id: meal._id,
    name: meal.name,
    servings: meal.servings,
    breakfast: meal.breakfast,
    lunch: meal.lunch,
    dinner: meal.dinner,
  }
);

exports.createMeal = (req, res) => {
  const meal = new Meal({
    name: req.body.name,
    servings: req.body.servings,
    breakfast: req.body.breakfast,
    lunch: req.body.lunch,
    dinner: req.body.dinner
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

exports.getMealPlan = async (req, res) => {
  const meals = [];
  const count = await Meal.count({});
  for (let i = 1; i <= 7; i += 1) {
    const breakfast = await Meal.findOne().skip(Math.floor(Math.random() * count));
    const lunch = await Meal.findOne().skip(Math.floor(Math.random() * count));
    const dinner = await Meal.findOne().skip(Math.floor(Math.random() * count));
    meals.push({ breakfast: convertToDTO(breakfast), lunch: convertToDTO(lunch), dinner: convertToDTO(dinner) });
  }
  res.send(meals);
};
