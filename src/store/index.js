import { createStore } from 'vuex'
import user from './modules/user'
import chat from './modules/chat'
import friend from './modules/friend'
import getters from './getters'

export default createStore({
  namespaced: true,
  modules: { user, chat, friend },
  getters
})
