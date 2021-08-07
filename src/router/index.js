import { createRouter, createWebHistory } from 'vue-router'
import store from '@/store'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    
  },
  {
    path: '/cashes',
    name: 'cashes.index',
    component: () => import('../views/cashes/Index.vue'),
    meta: {auth: true }
  },
  {
    path: '/cashes/:slug',
    name: 'cashes.show',
    component: () => import('../views/cashes/Show.vue'),
    meta: {auth: true }
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/auth/Register.vue'),
    meta: {guest: true }
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/auth/Login.vue'),
    meta: {guest: true }
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  linkExactActiveClass: "bg-indigo-100 rounded-lg"
})

router.beforeEach((to, from, next) => {
  //console.log(to.meta.auth)
  
  if ( to.meta.auth && !store.getters['auth/authenticated'] ) router.push('/login')
  if ( to.meta.guest && store.getters['auth/authenticated'] ) router.push('/')

  next()
})

export default router
