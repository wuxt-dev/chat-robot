import { login as loginApi } from '@/api/user'
import router from '@/router'

export default {
  namespaced: true,
  state: {
    token: localStorage.getItem('token'),
    tokenExpire: localStorage.getItem('tokenExpire'),
    tokenTime: localStorage.getItem('tokenTime'),
    user: JSON.parse(localStorage.getItem('user'))
  },
  mutations: {
    setToken(state, token) {
      state.token = token
      localStorage.setItem('token', token)
    },
    setTokenExpire(state, tokenExpire) {
      state.tokenExpire = tokenExpire
      localStorage.setItem('tokenExpire', tokenExpire)
    },
    setTokenTime(state, tokenTime) {
      state.tokenTime = tokenTime
      localStorage.setItem('tokenTime', tokenTime)
    },
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {
    login({ commit }, data) {
      return new Promise((resolve, reject) => {
        loginApi(data)
          .then((res) => {
            const { data } = res
            commit('setToken', data.token)
            commit('setTokenExpire', data.tokenExpire)
            commit('setTokenTime', Date.now())
            commit('setUser', data.user)
            resolve()
          })
          .catch()
      })
    },
    logout({ commit }) {
      commit('setToken', '')
      commit('setTokenExpire', '')
      commit('setTokenTime', '')
      router.replace('/login')
    }
  }
}
