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

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status
    if (status === 401) {
      // If user isn't logged in or their session expired, send them to login.
      // Keep it framework-agnostic by using location.
      const current = window.location.pathname + window.location.search
      const loginUrl = `/login?next=${encodeURIComponent(current)}`

      // Avoid redirect loops.
      if (!window.location.pathname.startsWith('/login')) {
        window.location.assign(loginUrl)
      }
    }

    return Promise.reject(error)
  },
)

export default api
