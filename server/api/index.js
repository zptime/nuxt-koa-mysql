
export function login ($axios, data) {
  return $axios.post('/api/login', data)
}

export function logout ($axios) {
  return $axios.post('/api/logout')
}

export function getAllUser ($axios) {
  return $axios.get('/api/users')
}

export function getUser ($axios, id) {
  return $axios.get(`/api/users/${id}`)
}

export function addUser ($axios, data) {
  return $axios.post('/api/users', data)
}

export function updateUser ($axios, payload) {
  return $axios.put(`/api/users/${payload.id}`, payload.data)
}

export function deleteUser ($axios, id) {
  return $axios.delete(`/api/users/${id}`)
}
