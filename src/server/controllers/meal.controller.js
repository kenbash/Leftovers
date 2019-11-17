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
  res.send([
    {
      breakfast: 'one',
      lunch: 'two',
      dinner: 'three'
    },
    {
      breakfast: 'one',
      lunch: 'two',
      dinner: 'three'
    },
    {
      breakfast: 'one',
      lunch: 'two',
      dinner: 'three'
    },
    {
      breakfast: 'one',
      lunch: 'two',
      dinner: 'three'
    },
    {
      breakfast: 'one',
      lunch: 'two',
      dinner: 'three'
    },
    {
      breakfast: 'one',
      lunch: 'two',
      dinner: 'three'
    },
    {
      breakfast: 'one',
      lunch: 'two',
      dinner: 'three'
    }
  ]);
};
