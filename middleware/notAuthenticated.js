/**
 * 用于验证已经登陆的中间件
 */
 export default function ({ store, redirect }) {
  if (store.state.user) {
    return redirect('/')
  }
}