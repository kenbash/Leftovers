exports.convertToMeal = meal => (
  {
    id: meal._id,
    name: meal.name,
    servings: meal.servings,
    breakfast: meal.breakfast,
    lunch: meal.lunch,
    dinner: meal.dinner,
    ingredients: meal.ingredients
  }
);

exports.convertToSimpleMeal = meal => (
  {
    id: meal._id,
    name: meal.name,
    servings: meal.servings,
    breakfast: meal.breakfast,
    lunch: meal.lunch,
    dinner: meal.dinner,
  }
);

exports.convertToMealName = meal => (
  {
    id: meal._id,
    name: meal.name
  }
);
