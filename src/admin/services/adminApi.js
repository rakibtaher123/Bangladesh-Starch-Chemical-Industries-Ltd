const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api'

async function request(endpoint, options = {}) {
  const response = await fetch(`${API_BASE}${endpoint}`, {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const contentType = response.headers.get('content-type') || ''
  const data = contentType.includes('application/json') ? await response.json() : {}

  if (!response.ok) {
    throw new Error(data.message || 'Request failed')
  }

  return data
}

export const adminApi = {
  login: (email, password) => request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) }),
  logout: () => request('/auth/logout', { method: 'POST' }),
  getMe: () => request('/auth/me'),
  changePassword: (currentPassword, newPassword) => request('/auth/change-password', { method: 'PUT', body: JSON.stringify({ currentPassword, newPassword }) }),
  getDashboardStats: () => request('/dashboard/stats'),

  getEnquiries: (params = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        searchParams.append(key, String(value))
      }
    })

    const queryString = searchParams.toString() ? `?${searchParams.toString()}` : ''
    return request(`/enquiries${queryString}`)
  },

  getEnquiry: id => request(`/enquiries/${id}`),
  updateEnquiry: (id, payload) => request(`/enquiries/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteEnquiry: id => request(`/enquiries/${id}`, { method: 'DELETE' }),
  replyToEnquiry: (id, message) => request(`/enquiries/${id}/reply`, { method: 'POST', body: JSON.stringify({ message }) }),
  getProducts: () => request('/products'),
  createProduct: payload => request('/products', { method: 'POST', body: JSON.stringify(payload) }),
  updateProduct: (id, payload) => request(`/products/${id}`, { method: 'PUT', body: JSON.stringify(payload) }),
  deleteProduct: id => request(`/products/${id}`, { method: 'DELETE' }),
}
