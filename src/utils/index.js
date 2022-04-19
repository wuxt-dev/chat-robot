import store from '@/store/index'
import { socket } from '@/api/socket'

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime = store.getters.tokenTime
  const tokenExpire = store.getters.tokenExpire
  return currentTime - tokenTime < tokenExpire
}

export const joinSocketRoom = (friend) => {
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
