const express = require('express');
const mealController = require('../controllers/meal.controller');

const router = express.Router();

router.post('/create', mealController.createMeal);
router.get('/:id', mealController.getMeal);
router.put('/:id/update', mealController.updateMeal);
router.delete('/:id/delete', mealController.deleteMeal);

module.exports = router;
