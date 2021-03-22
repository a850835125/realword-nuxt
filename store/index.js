const cookieParser = process.server ? require('cookieparser') : undefined

// 在服务端渲染期间运行的都是同一个实例
// 为了防止数据冲突，务必要把 state 定义成一个函数，返回数据对象
export const state = () => {
  return {
    // 当前登录用户的登录状态
    user: null
  }
}

const getters = {}
export const mutations = {
  setUser (state, payload) {
    state.user = payload
  }
}

export const actions = {  
  /**
   * 一个特殊的 actions 方法
   * 这个 action 会在服务端渲染期间自动调用
   * 主要用于初始化容器数据，以及传递数据给客户端使用
   * @param {*} commit 用于提交 mutation 的方法
   * @param {*} req 服务端渲染时的 request 请求对象
   */
  nuxtServerInit ({ commit }, { req }) {
    let user = null

    // 如果请求头里有 Cookie
    if (req.headers.cookie) {
      // 使用 cookieparser 把 cookie 字符串转为 js 对象
      const parsed = cookieParser.parse(req.headers.cookie)
      // 使用 trycatch 的原因是为了避免如果请求头中的 cookie 不是标准 json 格式的时候报错
      try{
        user = JSON.parse(parsed.user)
      } catch (err) {

      }
    }
    // 提交 mutation 修改 state 状态
    commit('setUser', user)
  }
}