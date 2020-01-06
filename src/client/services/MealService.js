
import { EventEmitter } from 'fbemitter';

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

const mealDetailChange = new EventEmitter();

export function updateMealDetail(id) {
  mealDetailChange.emit('loading', true);

  fetch(`api/meal/get/${id}`)
    .then(res => res.json())
    .then(meal => mealDetailChange.emit('change', meal));
}

export function onMealDetailChange(listener, eventType = 'change') {
  mealDetailChange.addListener(eventType, listener);
}
