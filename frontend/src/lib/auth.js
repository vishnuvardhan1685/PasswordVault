import api from './api'

export function getToken() {
  return localStorage.getItem('sv_token')
}

export function setToken(token) {
  localStorage.setItem('sv_token', token)
}

export function clearToken() {
  localStorage.removeItem('sv_token')
}

export async function login({ email, password }) {
  const { data } = await api.post('/auth/login', { email, password })
  // Expect: { token, user: { ... } }
  if (data?.token) setToken(data.token)
  return data
}

export async function signup({ email, password }) {
  const { data } = await api.post('/auth/register', { email, password })
  if (data?.token) setToken(data.token)
  return data
}
