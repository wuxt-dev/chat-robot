import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import ChatView from '../views/ChatView/index.vue'
import ContactView from '../views/ContactView/index.vue'
import { WHITE_LIST } from '@/config/index'
import { diffTokenTime } from '@/utils/index'
import { ElMessage } from 'element-plus'
import store from '@/store/index'

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

router.beforeEach((to, from, next) => {
  if (WHITE_LIST.includes(to.path)) next()
  else if (store.getters.token && diffTokenTime()) {
    next()
  } else {
    ElMessage.error('token过期，请重新登录！')
    next('/login')
  }
})

export default router
