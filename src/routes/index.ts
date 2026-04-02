import { createRouter, createWebHistory } from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import Orders from '@/views/Orders.vue'
import StockMovement from '@/views/StockMovement.vue'
import Invoices from '@/views/Invoices.vue'
import Products from '@/views/Products.vue'
import Customers from '@/views/Customers.vue'
import Users from '@/views/Users.vue'
import Reporting from '@/views/Reporting.vue'
import Warehouses from '@/views/Warehouses.vue'
import Login from '@/views/Login.vue'
import Landing from '@/views/Landing.vue'
import Settings from '@/views/Settings.vue'

const routes = [
  {path: '/home',name: 'Landing', component: Landing, meta: { guestOnly: true, hideLayout: true, titleKey: 'route.home' } },
  { path: '/login', name: 'Login', component: Login, meta: { guestOnly: true, hideLayout: true, titleKey: 'route.login' } },
  { path: '/', name: 'Dashboard', component: Dashboard, meta: { requiresAuth: true, titleKey: 'route.dashboard' } },
  { path: '/orders', name: 'Orders', component: Orders, meta: { requiresAuth: true, titleKey: 'route.orders' } },
  { path: '/stock-movement', name: 'Stock Movement', component: StockMovement, meta: { requiresAuth: true, titleKey: 'route.stockMovement' } },
  { path: '/invoices', name: 'Invoices', component: Invoices, meta: { requiresAuth: true, titleKey: 'route.invoices' } },
  { path: '/products', name: 'Products', component: Products, meta: { requiresAuth: true, titleKey: 'route.products' } },
  { path: '/warehouses', name: 'Warehouses', component: Warehouses, meta: { requiresAuth: true, titleKey: 'route.warehouses' } },
  { path: '/customers', name: 'Customers', component: Customers, meta: { requiresAuth: true, titleKey: 'route.customers' } },
  { path: '/users', name: 'Users', component: Users, meta: { requiresAuth: true, titleKey: 'route.users' } },
  { path: '/reporting', name: 'Reporting', component: Reporting, meta: { requiresAuth: true, titleKey: 'route.reporting' } },
  { path: '/settings', name: 'Settings', component: Settings, meta: { requiresAuth: true, titleKey: 'route.settings' } },
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
