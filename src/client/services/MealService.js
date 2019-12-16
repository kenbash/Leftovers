
export function getMealPlan() {
  return fetch('/api/meal/mealplan').then(res => res.json());
}

export function getMeals() {
  return fetch('/api/meal/all').then(res => res.json());
}

export function createMeal(meal) {
  return fetch('/api/meal/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: meal
  }).then(res => res.json());
}

export function editMeal() {}

export function deleteMeal() {}
