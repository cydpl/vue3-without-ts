import axios from 'axios'
import { getToken } from './cache/cookies'

const instance = axios.create({
  timeout: 1000, //超时配置
  withCredentials: true, //跨越携带Cookie
  baseURL: import.meta.env.VITE_BASE_API
})

//添加请求拦截器
instance.interceptors.request.use(
  function (config) {
    //在发送请求之前的操作
    const token = getToken()
    if (token) {
      config.headers.Authorization = `${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

//添加响应拦截器
instance.interceptors.response.use(
  function (response) {
    //对响应数据做点什么
    const apiData = response.data
    const code = apiData.code
    if (code === 200) return apiData
  },
  function (error) {
    // status 是 HTTP 状态码
    // const status = get(error, 'response.status')
    const status = error.status
    switch (status) {
      case 400:
        error.message = '请求错误'
        break
      case 401:
        // Token 过期时
        // logout()
        break
      case 403:
        error.message = '拒绝访问'
        break
      case 404:
        error.message = '请求地址出错'
        break
      case 408:
        error.message = '请求超时'
        break
      case 500:
        error.message = '服务器内部错误'
        break
      case 501:
        error.message = '服务未实现'
        break
      case 502:
        error.message = '网关错误'
        break
      case 503:
        error.message = '服务不可用'
        break
      case 504:
        error.message = '网关超时'
        break
      case 505:
        error.message = 'HTTP 版本不受支持'
        break
      default:
        break
    }
    //  ElMessage.error(error.message)
    return Promise.reject(error)
  }
)
