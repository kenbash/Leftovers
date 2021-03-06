
import { EventEmitter } from 'fbemitter';

const mealDetailChange = new EventEmitter(); // eventType = 'change' | 'loading'
const mealListChange = new EventEmitter(); // eventType = 'edit' | 'delete'

export function getMealPlan() {
  return fetch('/api/meal/mealplan')
    .then(res => (res.ok ? res.json() : Promise.reject(res)));
}

export function getMeals() {
  return fetch('/api/meal/all')
    .then(res => (res.ok ? res.json() : Promise.reject(res)));
}

export function createMeal(meal) {
  return fetch('/api/meal/create', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: meal
  }).then(res => (res.ok ? res.json() : Promise.reject(res)));
}

export function updateMeal(id, meal) {
  return fetch(`/api/meal/update/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: meal
  }).then(res => (res.ok ? res : Promise.reject(res)));
}

export function deleteMeal(id) {
  return fetch(`/api/meal/delete/${id}`, { method: 'DELETE' })
    .then(res => (res.ok ? res : Promise.reject(res)));
}

export function updateMealDetail(id) {
  mealDetailChange.emit('loading', true);

  fetch(`api/meal/get/${id}`)
    .then(res => (res.ok ? res.json() : Promise.reject(res)))
    .then(
      meal => mealDetailChange.emit('change', meal),
      () => mealDetailChange.emit('change', null)
    );
}

export function onMealDetailChange(eventType, listener) {
  mealDetailChange.addListener(eventType, listener);
}

export function updateMealList(eventType, meal) {
  mealListChange.emit(eventType, meal);
}

export function onMealListChange(eventType, listener) {
  mealListChange.addListener(eventType, listener);
}
