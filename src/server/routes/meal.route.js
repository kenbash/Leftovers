const express = require('express');
const mealController = require('../controllers/meal.controller');

const router = express.Router();

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  return res.sendStatus(401);
}

router.post('/create', checkAuthenticated, mealController.createMeal);
router.put('/update/:id', checkAuthenticated, mealController.updateMeal);
router.delete('/delete/:id', checkAuthenticated, mealController.deleteMeal);
router.get('/get/:id', mealController.getMeal);
router.get('/mealplan', mealController.getMealPlan);
router.get('/all', mealController.getAllMeals);

module.exports = router;
