const express = require('express');
const mealController = require('../controllers/meal.controller');

const router = express.Router();

router.post('/create', mealController.createMeal);
router.put('/update/:id', mealController.updateMeal);
router.delete('/delete/:id', mealController.deleteMeal);
router.get('/get/:id', mealController.getMeal);
router.get('/mealplan', mealController.getMealPlan);
router.get('/all', mealController.getAllMeals);

module.exports = router;
