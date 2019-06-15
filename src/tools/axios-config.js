/**
 * Created by lujianjun on 2019/05/23.
 * 接口调用配置
 *
 * 使用方法
 * import AxionsConfig from 'AxionsConfig'
 * Vue.use(AxionsConfig, axios)
 * axios/¥ajax 默认配置
 * $ajaxForm form表单方式提交
 * $ajaxFile FormData的方式上传文件
 */
const AxiosConfig = {
  /**
   * @param resultCode int http状态码
   */
  errResponse (resultCode) {
    if (window.app) {
      switch (resultCode) {
        case 401:

          break
        case 500:
          window.app.$message({
            message: '服务器正忙，请稍后重试',
            type: 'error'
          })
          break
        case 504:
          window.app.$message({
            message: '请求超时',
            type: 'error'
          })
          break
        default:

          break
      }
    }
  },
  // 取消上一次请求
  pending: [],
  cancelPending (config) {
    this.pending.forEach((item, index) => {
      if (config) {
        if (item.UrlPath === config.url) {
          item.Cancel() // 取消请求
          this.pending.splice(index, 1) // 移除當前请求紀錄
        }
      } else {
        item.Cancel() // 取消请求
        this.pending.splice(index, 1) // 移除當前请求紀錄
      }
    })
  },
  ajaxFilters (axios, CancelToken) {
    // 缓存作用域
    axios.defaults.headers['X-Requested-With'] = 'XMLHttpRequest'
    // 携带上次的token
    axios.defaults.withCredentials = true

    // 请求拦截器
    axios.interceptors.request.use(config => {
      // Do something before request is sent
      this.cancelPending(config)
      config.cancelToken = new CancelToken(res => {
        this.pending.push({'UrlPath': config.url, 'Cancel': res})
      })
      return config
    }, function (error) {
      // Do something with request error
      return Promise.reject(error)
    })

    // 响应拦截器
    axios.interceptors.response.use(response => {
      this.cancelPending(response.config) // 取消上一次请求

      let resultCode = response.data.resultCode
      this.errResponse(resultCode) // 处理错误信息
      // Do something with response data
      return response
    }, error => {
      let resultCode = 504
      if (error.response) {
        resultCode = error.response.status
      }
      this.errResponse(resultCode) // 处理错误信息
      // Do something with response error
      return Promise.reject(error)
    })
  },
  install (Vue, axios) {
    // 配置默认的ajax
    let ajax = axios.create()

    // 配置form表单方式提交
    let ajaxForm = axios.create({
      transformRequest: [function (data) {
        let ret = ''
        if (typeof data === 'object') {
          for (let it in data) {
            ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
          }
        } else {
          ret = data
        }
        return ret
      }],
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    })

    // 使用FormData的方式上传文件
    let ajaxFile = axios.create({
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    })

    //  取消请求
    let CancelToken = axios.CancelToken

    this.ajaxFilters(ajax, CancelToken)
    this.ajaxFilters(ajaxForm, CancelToken)
    this.ajaxFilters(ajaxFile, CancelToken)

    Vue.axios = axios

    Object.defineProperties(Vue.prototype, {

      axios: {
        get () {
          return axios
        }
      },

      $ajaxForm: {
        get () {
          return ajaxForm
        }
      },
      $ajaxFile: {

        get () {
          return ajaxFile
        }
      },

      $ajax: {
        get () {
          return ajax
        }
      }

    })
  }
}

export default AxiosConfig
