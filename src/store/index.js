import { createStore } from 'vuex'
import user from './modules/user'
import chat from './modules/chat'
import getters from './getters'

export default createStore({
  nameSpced: true,
  modules: { user, chat },
  getters
})
