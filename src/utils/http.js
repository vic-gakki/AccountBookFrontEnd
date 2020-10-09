import axios from 'axios'
import store from '@/store'
import { basicAuthToken } from '@/utils/auth'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  timeout: 5000 // request timeout
})

export function httpInit(vue){
  service.interceptors.request.use(
    config => {
      if (store.getters.token) {
        config.headers['Authorization'] = basicAuthToken()
      }
      let param = config.data || config.params || {};
      if(!(param.noLoading || param.noloading)){
        vue.$loading.open()
      }
      param.noloading = undefined
      if (config.method === "post") {
        let newData = config.data;
        if (!(newData instanceof FormData)) {
          newData = new FormData();
          for (let key in config.data) {
            if (config.data[key] !== undefined) {
              newData.append(
                key,
                typeof config.data[key] == "object"
                  ? JSON.stringify(config.data[key])
                  : config.data[key]
              );
            }
          }
        }
        config.data = newData;
      } else {
        for (let key in config.params) {
          if (config.params[key] == undefined) {
            delete config.params[key];
          }
        }
      }
      return config
    },
    error => {
      console.log(error) // for debug
      return Promise.reject(error)
    }
  )
  service.interceptors.response.use(
    response => {
      vue.$loading.close()
      return response.data
    },
    error => {
      vue.$loading.close()
      // 请求结果状态码不以2开头  获取返回信息error.response
      const {data} = error.response
      // 40108: token不合法  40116: token已过期  清楚token记录，重新登陆
      if(data.errorCode === 40108 || data.errorCode === 40116){
        this.$error({
          title: '错误警告',
          content: '登录信息已失效, 请重新登陆',
          onOk(){
            store.dispatch('user/resetToken').then(() => {
              location.reload()
            })
          }
        });
      }else{
        let message = data.msg
        if(Array.isArray(data.msg)){
          message = data.msg.reduce((acc, cur) => {
            return `${acc}\n${cur}`
          })
        }
        this.$message.error({
          content: message,
          duration: 2
        })
      }
      return Promise.reject(data)
    }
  )
  vue.prototype.$axios = service
  window.axios = service
}
