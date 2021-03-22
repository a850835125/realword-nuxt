/**
 * 请求相关的插件
 */

import axios from 'axios'

// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io'
})

// 通过插件机制获取到上下文对象(query, params, req, response, app, store...)
// 插件导出函数必须作为 default 成员
export default ({ store }) => {
  // 请求拦截器
  // 任何请求都需要经过请求拦截器
  // 可以在拦截器中做一些公共的业务处理，如设置 token
  request.interceptors.request.use(function (config) {

    const { user } = store.state

    if (user && user.token) {
      config.headers.Authorization = `Token ${ user.token }`
    }    
    
    return config
  }, function (error) {
    // 如果请求还没有发出就失败的话，就会进入这个方法
    return Promise.reject(error)
  })

}


// 响应拦截器


// export default request