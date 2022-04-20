import store from '@/store/index'

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime = store.getters.tokenTime
  const tokenExpire = store.getters.tokenExpire
  return currentTime - tokenTime < tokenExpire
}

export const joinSocketRoom = (friend, socket) => {
  store.commit('chat/setChatFriend', friend)
  const userId = store.getters.userId
  const socketRoom =
    userId > friend.id ? `${userId}-${friend.id}` : `${friend.id}-${userId}`
  socket.emit('join room', {
    room: socketRoom,
    username: store.getters.username
  })
  store.commit('chat/setChatRoom', socketRoom)
}

export const formatMessage = (message) => {
  return {
    username: store.getters.username,
    msg: message
  }
}
