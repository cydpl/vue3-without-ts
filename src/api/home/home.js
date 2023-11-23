import request from '@/utils/request.js'

export function getMessage(data) {
  return request({
    url: '/api/messages',
    method: 'post',
    data
  })
}

export function setMessage(params) {
  return request({
    url: '/api/messages',
    method: 'post',
    params
  })
}
