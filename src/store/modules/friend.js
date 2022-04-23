export default {
  namespaced: true,
  state: {
    friendList: []
  },
  mutations: {
    setFriendList(state, friendList) {
      state.friendList = friendList
    }
  }
}
