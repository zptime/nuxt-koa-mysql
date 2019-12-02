
export function login ($axios, data) {
  return $axios.post('/api/login', data)
}

export function logout ($axios) {
  return $axios.post('/api/logout')
}

export function getAllUser ($axios) {
  return $axios.get('/api/users')
}
