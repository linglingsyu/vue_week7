import { createRouter, createWebHashHistory } from 'vue-router'
import AuthStore from '@/store/AuthStore.js'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/ProductList.vue')
  },
  {
    path: '/products',
    name: 'Products',
    component: () => import('@/views/ProductList.vue')
  },
  {
    path: '/product/:id',
    name: 'Product',
    component: () => import('@/views/ProductView.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    component: () => import('@/views/CartView.vue')
  },
  {
    path: '/orders',
    name: 'Orders',
    component: () => import('@/views/OrdersView.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/LoginView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  linkActiveClass: 'active',
  routes
})

router.beforeEach(async (to, from) => {
  const store = AuthStore()
  if (to.name !== 'login') {
    console.log(store.isLogin)
    store.checkLogin()
  }
})

export default router
