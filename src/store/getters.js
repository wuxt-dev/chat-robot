export default {
  token: (state) => state.user.token,
  tokenExpire: (state) => state.user.tokenExpire,
  tokenTime: (state) => state.user.tokenTime,
  user: (state) => state.user.user,
  username: (state) => (state.user.user ? state.user.user.username : ''),
  userId: (state) => (state.user.user ? state.user.user.id : ''),
  chatFriend: (state) => state.chat.chatFriend,
  chatRoom: (state) => state.chat.chatRoom
}
