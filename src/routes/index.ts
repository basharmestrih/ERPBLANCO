import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/home', name: 'Landing', component: () => import('@/views/Landing.vue'), meta: { guestOnly: true, hideLayout: true, titleKey: 'route.home' } },
  { path: '/login', name: 'Login', component: () => import('@/views/Login.vue'), meta: { guestOnly: true, hideLayout: true, titleKey: 'route.login' } },
  { path: '/', name: 'Dashboard', component: () => import('@/views/Dashboard.vue'), meta: { requiresAuth: true, titleKey: 'route.dashboard' } },
  { path: '/orders', name: 'Orders', component: () => import('@/views/Orders.vue'), meta: { requiresAuth: true, titleKey: 'route.orders' } },
  { path: '/stock-movement', name: 'Stock Movement', component: () => import('@/views/StockMovement.vue'), meta: { requiresAuth: true, titleKey: 'route.stockMovement' } },
  { path: '/invoices', name: 'Invoices', component: () => import('@/views/Invoices.vue'), meta: { requiresAuth: true, titleKey: 'route.invoices' } },
  { path: '/products', name: 'Products', component: () => import('@/views/Products.vue'), meta: { requiresAuth: true, titleKey: 'route.products' } },
  { path: '/warehouses', name: 'Warehouses', component: () => import('@/views/Warehouses.vue'), meta: { requiresAuth: true, titleKey: 'route.warehouses' } },
  { path: '/customers', name: 'Customers', component: () => import('@/views/Customers.vue'), meta: { requiresAuth: true, titleKey: 'route.customers' } },
  { path: '/users', name: 'Users', component: () => import('@/views/Users.vue'), meta: { requiresAuth: true, titleKey: 'route.users' } },
  { path: '/reporting', name: 'Reporting', component: () => import('@/views/Reporting.vue'), meta: { requiresAuth: true, titleKey: 'route.reporting' } },
  { path: '/payments', name: 'Payments', component: () => import('@/views/Payments.vue'), meta: { requiresAuth: true, titleKey: 'route.payments' } },
  { path: '/settings', name: 'Settings', component: () => import('@/views/Settings.vue'), meta: { requiresAuth: true, titleKey: 'route.settings' } },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  const token = localStorage.getItem('auth_token')

  if (to.meta.requiresAuth && !token) {
    return '/home'
  }

  if (to.meta.guestOnly && token) {
    return '/'
  }

  return true
})

export default router
