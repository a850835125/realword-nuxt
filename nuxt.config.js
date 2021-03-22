/**
 * Nuxt.js 配置文件
 */

module.exports = {
  router: {
    linkActiveClass: 'active',
    // 自定义路由表规则
    extendRoutes (routes, resolve) {
      // 清除 nuxt.js 基于 pages 目录默认生成的路由表规则
      routes.splice(0)
      routes.push(...[
        {
          path: '/',
          component: resolve(__dirname, 'pages/layout/'),
          children: [
            {
              path: '', // 默认子路由
              name: 'home',
              component: resolve(__dirname, 'pages/home/')
            },
            {
              path: '/login', // 登录
              name: 'login',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/register', // 注册
              name: 'register',
              component: resolve(__dirname, 'pages/login/')
            },
            {
              path: '/profile/:username', // 个人资料
              name: 'profile',
              component: resolve(__dirname, 'pages/profile/')
            },
            {
              path: '/settings', // 设置
              name: 'settings',
              component: resolve(__dirname, 'pages/settings/')
            },
            {
              path: '/editor', // 编辑
              name: 'editor',
              component: resolve(__dirname, 'pages/editor/')
            },
            {
              path: '/article/:slug', // 文章列表
              name: 'article',
              component: resolve(__dirname, 'pages/article/')
            }
          ]
        },

      ])
    }
  },
  // 服务运行相关
  server: {
    // 在生产环境下，0.0.0.0 可以监听服务器上所有的网卡地址
    host: '0.0.0.0',
    port: 3000
  },
  // 引入插件机制
  plugins: [
    '~/plugins/request.js',
    '~/plugins/dayjs.js'
  ]
}