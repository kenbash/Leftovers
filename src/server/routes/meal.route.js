const express = require('express');
const mealController = require('../controllers/meal.controller');

const router = express.Router();

router.post('/create', mealController.createMeal);
router.put('/:id/update', mealController.updateMeal);
router.delete('/:id/delete', mealController.deleteMeal);
router.get('/:id/get', mealController.getMeal);
router.get('/mealplan', mealController.getMealPlan);
router.get('/all', mealController.getAllMeals);

module.exports = router;
