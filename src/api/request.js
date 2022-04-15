import axios from 'axios'
import { ElMessage } from 'element-plus'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000
})

service.interceptors.request.use(
  (config) => {
    if (localStorage.getItem('token')) {
      config.headers.Authorization = localStorage.getItem('token')
    }
    return config
  },
  (err) => {
    ElMessage.error(err.request.data)
    return Promise.reject(err.request.data)
  }
)

service.interceptors.response.use(
  (res) => {
    const { data, status, statusText } = res
    if (status === 200 || status === 201) {
      if (data.status === 1) {
        ElMessage.error(data.message)
        return Promise.reject(new Error(statusText))
      }
      return data
    } else {
      ElMessage.error(statusText)
      return Promise.reject(new Error(statusText))
    }
  },
  (err) => {
    ElMessage.error(err.response.data)
    return Promise.reject(new Error(err.response.data))
  }
)

export default service
