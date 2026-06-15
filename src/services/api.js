import axios from 'axios'

const api = axios.create({
  baseURL: '/api',
  headers: { 'Content-Type': 'application/json' },
})

// Attach JWT to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('cb_token')
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

// Auth
export const loginApi = (data)          => api.post('/auth/login', data)

// Dashboard
export const getDashboardSummary = ()   => api.get('/dashboard/summary')
export const getAccounts         = ()   => api.get('/accounts')
export const getCashFlow         = ()   => api.get('/cashflow')
export const getTopReceivables   = ()   => api.get('/receivables/top')
export const getTopPayables      = ()   => api.get('/payables/top')
export const getAlerts           = ()   => api.get('/alerts')
export const getHealthScore      = ()   => api.get('/health-score')
export const getInsights         = ()   => api.get('/insights')

export default api
