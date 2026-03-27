
export const API_BASE_URL = 'http://localhost:8000/api'


export const endpoints = {
  login: '/login',
  register: '/register',
  me: '/me',
  roles: '/roles',
  orders: '/orders',
  customers: '/customers',
  users: '/users',
  products: '/products',
  stockMovements: '/stock-movements',
  invoices: '/invoices',
  warehouses: '/warehouses',
  productWarehouses: (id: number) => `/productwarehouses/${id}`,
  categories: '/categories',
  units: '/units',
  approveOrder: (id: number) => `/orders/${id}/approve`,
  deleteOrder: (id: number) => `/orders/${id}`,
  dashboard: '/reports/dashboard',
}
