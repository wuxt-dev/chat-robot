import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '@/views/Login/index.vue'
import Register from '@/views/Register/index.vue'
import Layout from '@/layout/index.vue'
import { WHITE_LIST } from '@/config/index'
import { diffTokenTime } from '@/utils/index'
import { ElMessage } from 'element-plus'
import store from '@/store/index'
import { socket } from '@/api/socket'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Layout
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
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (from.path === '/' && to.path !== '/') {
    socket.disconnect()
  } else if (to.path === '/') {
    socket.connect()
  }
  if (WHITE_LIST.includes(to.path)) next()
  else if (store.getters.token && diffTokenTime()) {
    next()
  } else {
    ElMessage.error('token过期，请重新登录！')
    next('/login')
  }
})

export default router
