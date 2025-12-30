import axios from 'axios'

const api = axios.create({
  // Single-service Render deploy: frontend and backend share the same origin.
  // Local dev: Vite proxy forwards `/api` -> http://localhost:5000.
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('pv_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

export default api
