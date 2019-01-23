import axios from 'axios'
import {
  Loading
} from 'element-ui'

//element loading 
let needLoadingRequestCount = 0

function showFullScreenLoading() {
  if (needLoadingRequestCount === 0) {
    startLoading()
  }
  needLoadingRequestCount++
}
let loading

function startLoading() {
  loading = Loading.service({
    lock: true,
    text: '加载中……',
    // background: 'rgba(0, 0, 0, 0.7)'
  })
}

function endLoading() {
  loading.close()
}

function tryHideFullScreenLoading() {
  if (needLoadingRequestCount <= 0) return
  needLoadingRequestCount--
  if (needLoadingRequestCount === 0) {
    endLoading()
  }
}



const axio = axios.create({
  baseURL: process.env.BASE_URL, // node环境的不同，对应不同的baseURL   process.env.BASE_API
  timeout: 15000, // 请求的超时时间
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  },
  withCredentials: true // 允许携带cookie
})
// http request 拦截器 
axio.interceptors.request.use(
  config => {
    showFullScreenLoading()
    console.log("config", config)
    return config;
  },
  err => {
    return Promise.reject(err).catch(err);
  });
// http response 拦截器 
axio.interceptors.response.use(
  response => {
    tryHideFullScreenLoading()
    return response;
  },
  (err) => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    } else {
      err.message = '网络错误，请稍后再试！'
    }
    if (err && err.response && err.response.data && err.response.data.message) {
      console.warn(err.response.data.message)
    } else {
      console.warn(err.message)
    }
    return Promise.reject(err).catch(err)
  });
export default axio