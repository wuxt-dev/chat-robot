import { createStore } from 'vuex'
import { login as loginApi } from '@/api/user'

export default createStore({
  state: {
    token: localStorage.getItem('token'),
    tokenExpire: localStorage.getItem('tokenExpire'),
    tokenTime: localStorage.getItem('tokenTime'),
    user: JSON.parse(localStorage.getItem('user')),
    chatFriend: 'robot'
  },
  getters: {
    token: (state) => state.token,
    tokenExpire: (state) => state.tokenExpire,
    tokenTime: (state) => state.tokenTime,
    user: (state) => state.user,
    username: (state) => state.user.username,
    chatFriend: (state) => state.chatFriend
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
    },
    setChatFriend(state, chatFriend) {
      state.chatFriend = chatFriend
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
          .catch(() => {})
      })
    }
  }
})
