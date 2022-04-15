import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import ChatView from '../views/ChatView/index.vue'
import ContactView from '../views/ContactView/index.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Login
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/contact',
    name: 'ContactView',
    component: ContactView
  },
  {
    path: '/chat',
    name: 'chatView',
    component: ChatView
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const whiteList = ['/login', '/register']
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    if (to.path === '/login') next('/contact')
    else {
      next()
    }
  } else {
    if (whiteList.includes(to.path)) next()
    else next('/login')
  }
})

export default router
