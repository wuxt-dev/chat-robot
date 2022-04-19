import request from './request'

export const getFriendList = (id) => {
  return request({
    url: `/friend?userId=${id}`,
    method: 'get'
  })
}
