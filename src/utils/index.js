import store from '@/store/index'

// 是否已经过期
export const diffTokenTime = () => {
  const currentTime = Date.now()
  const tokenTime = store.getters.tokenTime
  const tokenExpire = store.getters.tokenExpire
  return currentTime - tokenTime < tokenExpire
}
