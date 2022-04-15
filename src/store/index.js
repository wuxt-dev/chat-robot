import { createStore } from 'vuex'

export default createStore({
  state: {
    user: JSON.parse(localStorage.getItem('user'))
  },
  getters: {
    user: (state) => state.user,
    username: (state) => state.user.username,
    id: (state) => state.user.id
  },
  mutations: {
    setUser(state, user) {
      state.user = user
      localStorage.setItem('user', JSON.stringify(user))
    }
  },
  actions: {}
})
