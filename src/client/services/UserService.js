import { EventEmitter } from 'fbemitter';

const loginChange = new EventEmitter();

export function getUser() {
  return fetch('/api/user')
    .then(res => (res.ok ? res.json() : Promise.reject(res)));
}

export function registerUser(userForm) {
  return fetch('/api/user/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: userForm
  }).then(res => res.status);
}

export function loginUser(userForm) {
  return fetch('/api/user/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: userForm
  }).then(res => res.status);
}

export function logoutUser() {
  return fetch('/api/user/logout', { method: 'DELETE', });
}

export function updateLogin(loginState) {
  loginChange.emit('change', loginState);
}

export function onLoginChange(listener) {
  loginChange.addListener('change', listener);
}
