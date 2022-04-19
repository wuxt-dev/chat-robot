export default {
  namespaced: true,
  state: {
    chatFriend: { id: 0, username: 'Chat Bot' },
    chatRoom: ''
  },
  mutations: {
    setChatFriend(state, chatFriend) {
      state.chatFriend = chatFriend
    },
    setChatRoom(state, room) {
      state.chatRoom = room
    }
  }
}
