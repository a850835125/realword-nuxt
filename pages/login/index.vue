<template>
  <div class="auth-page">
    <div class="container page">
      <div class="row">

        <div class="col-md-6 offset-md-3 col-xs-12">
          <h1 class="text-xs-center">{{ isLogin ? 'Sign in' : 'Sign up' }}</h1>
          <p class="text-xs-center">
            <!-- <a href="">Have an account?</a> -->
            <nuxt-link v-if="isLogin" to="/register">Need an account?</nuxt-link>
            <nuxt-link v-else to="/login">Have an account?</nuxt-link>
          </p>

          <ul class="error-messages">
            <template v-for="(messages, field) in errors">
              <li v-for="(message, index) in messages" :key="index">{{ field }} {{ message }}</li>
            </template>
          </ul>

          <form @submit.prevent="onSubmit">
            <fieldset class="form-group" v-if="!isLogin">
              <input class="form-control form-control-lg" type="text" placeholder="Your Name" required v-model="user.username">
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="email" placeholder="Email" v-model="user.email" required>
            </fieldset>
            <fieldset class="form-group">
              <input class="form-control form-control-lg" type="password" placeholder="Password" v-model="user.password" required minlength="8">
            </fieldset>
            <button class="btn btn-lg btn-primary pull-xs-right">
              {{ isLogin ? 'Sign in' : 'Sign up' }}
            </button>
          </form>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
  import { login, register } from '@/api/user'
  // 只在客户端加载 js-cookie
  // process.client 是 nuxt.js 提供的特殊数据，如果是 true 就等于是客户端，反之是服务端
  const Cookie = process.client ? require('js-cookie') : undefined

  export default {
    name: 'LoginIndex',
    middleware: 'notAuthenticated',
    components: {},
    props: {},
    data() {
      return {
        user: {
          username: '',
          email: '',
          password: ''
        },
        // 错误信息
        errors: {}
      }
    },
    computed: {
      isLogin () {
        return this.$route.name === 'login'
      }
    },
    watch: {},
    create() {},
    mounted() {},
    methods: {
      async onSubmit () {
        try {
          // 请求登录/注册
          const { data } = this.isLogin ? await login({user: this.user}) : await register({user: this.user})
          
          // TODO: 保存用户登录状态
          // 把登录后的信息存储到 vuex 容器中
          this.$store.commit('setUser', data.user)
          // 为了刷新页面导致数据丢失
          // 需要进行数据的持久化
          Cookie.set('user', data.user)
          // 跳转到首页
          this.$router.push('/')
        } catch (err) {
          // console.log(error)
          this.errors = err.response.data.errors
        }
      }
    }
  }
</script>

<style scope>

</style>