import request from './request'

export const getFriendList = (id) => {
  return request({
    url: `/friend?userId=${id}`,
    method: 'get'
  })
}

export const searchUser = ({ id, username }) => {
  return request({
    url: `/friend/search?userId=${id}&username=${username}`,
    method: 'get'
  })
}

export const addFriend = (userId, friendId) => {
  return request({
    url: '/friend/add',
    method: 'post',
    data: {
      userId,
      friendId
    }
  })
}
