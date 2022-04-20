export default {
  namespaced: true,
  state: {
    chatFriend: { id: 0, username: 'Chat Bot' },
    chatRoom: '',
    historyMsg: {}
  },
  mutations: {
    setChatFriend(state, chatFriend) {
      state.chatFriend = chatFriend
    },
    setChatRoom(state, room) {
      state.chatRoom = room
    },
    addHistoryMsg(state, message) {
      if (state.historyMsg[state.chatFriend.username]) {
        state.historyMsg[state.chatFriend.username].push(message)
      } else {
        state.historyMsg[state.chatFriend.username] = [{ ...message }]
      }
    }
  }
}
