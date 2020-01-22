export function getUser() {
  return fetch('/api/user')
    .then(res => (res.ok ? res.json() : Promise.reject(res)));
}

export function registerUser() {
  return fetch('/api/register')
    .then(res => (res.ok ? res.json() : Promise.reject(res)));
}
