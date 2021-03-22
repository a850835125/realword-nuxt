<template>
  <div class="home-page">

    <div class="banner">
      <div class="container">
        <h1 class="logo-font">conduit</h1>
        <p>A place to share your knowledge.</p>
      </div>
    </div>

    <div class="container page">
      <div class="row">

        <div class="col-md-9">
          <!-- 导航 tab -->
          <div class="feed-toggle">
            <ul class="nav nav-pills outline-active">
              <li class="nav-item" v-if="user">
                <!-- 增加 exact 严格匹配 -->
                <nuxt-link class="nav-link" :class="{ active: tab === 'your_feed' }" exact :to="{ name: 'home', query: { tab: 'your_feed' } }">Your Feed</nuxt-link>
              </li>
              <li class="nav-item">
                <nuxt-link class="nav-link" :class="{ active: tab === 'global_feed' }" exact :to="{ name: 'home', query: { tab: 'global_feed' } }">Global Feed</nuxt-link>
              </li>
              <li class="nav-item" v-if="tag">
                <nuxt-link class="nav-link" :class="{ active: tab === 'tag' }" :to="{ name: 'home', query: { tab: 'tag', tag: tag } }">#{{ tag }}</nuxt-link>
              </li>
            </ul>
          </div>
          <!-- 文章列表 -->
          <div class="article-preview" v-for="article in articles" :key="article.slug">
            <div class="article-meta">
              <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }"><img :src="article.author.image" /></nuxt-link>
              <div class="info">
                <nuxt-link :to="{ name: 'profile', params: { username: article.author.username } }" class="author">{{ article.author.username }}</nuxt-link>
                <span class="date">{{ article.createdAt | date('MMM DD,YYYY') }}</span>
              </div>
              <button class="btn btn-outline-primary btn-sm pull-xs-right" 
              :class="{ active: article.favorited }" 
              @click="onFavorite(article)"
              :disabled="article.favoriteDisable">
                <i class="ion-heart"></i> {{ article.favoritesCount }}
              </button>
            </div>
            <nuxt-link :to="{ name: 'article', params: { slug: article.slug } }" class="preview-link">
              <h1>{{ article.title }}</h1>
              <p>{{ article.description }}</p>
              <span>Read more...</span>
            </nuxt-link>
          </div>
          <!-- 分页列表 -->
          <nav>
            <ul class="pagination">
              <li class="page-item" :class="{ active: item === page }" v-for="item in totalPage" :key="item">
                <nuxt-link class="page-link" :to="{ name: 'home', query: { page: item, tag: $route.query.tag, tab: tab } }">{{ item }}</nuxt-link>
              </li>
            </ul>
          </nav>
        </div>
        <!-- 文章标签列表 -->
        <div class="col-md-3">
          <div class="sidebar">
            <p>Popular Tags</p>
            <div class="tag-list">
              <nuxt-link :to="{ name: 'home', query: { tag: item, tab: 'tag' } }" class="tag-pill tag-default" v-for="item in tags" :key="item">{{ item }}</nuxt-link>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>

<script>
  import { getArticles, getFeedArticles, addFavorite, unFavorite } from '@/api/article'
  import { getTags } from '@/api/tag'
  import { mapState } from 'vuex'
  export default {
    name: 'HomeIndex',
    components: {},
    props: {},
    // 监听地址栏 query 参数的变化，去调用 asyncData 
    watchQuery: ['page', 'tag', 'tab'],  
    async asyncData ({ query, store }) {
      const page = Number.parseInt(query.page || 1)
      const limit = 20
      const { tag } = query
      const  tab  = query.tab || 'global_feed'
      // 判断当前 tab 页是否为个人页，如果是，则调用获取个人关注文章列表接口
      const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles : getArticles
      
      // 当存在多个异步操作且操作之间没有依赖，可以使用 Promise.all 并行执行
      // 并行执行获取文章列表和标签列表
      const [ articleRes, tagRes ] = await Promise.all([
        loadArticles({ limit, offset: (page - 1) * 2, tag }),
        getTags()
      ])

      const { articles, articlesCount } = articleRes.data
      // 增加 favoriteDisable 状态
      // 防止由于网络问题，导致按钮不断点击 
      articles.forEach(article => {
        article.favoriteDisable = false
      })
      const { tags } = tagRes.data
      return {
        articles: articles,
        articlesCount: articlesCount,
        limit,
        page,
        tags,
        tag,
        tab: query.tab || 'global_feed'
      }
    },
    computed: {
      ...mapState(['user']),
      totalPage () {
        return Math.ceil(this.articlesCount / this.limit)
      }      
    },
    watch: {},
    create() {},
    mounted() {},
    methods: {
      async onFavorite (article) {
        // 标识点赞功能，防止频繁点击发起请求
        article.favoriteDisable = true
        // 判断是否已经点赞
        if (article.favorited) {
          await unFavorite(article.slug)
          article.favorited = false
          article.favoritesCount += -1
        } else {
          await addFavorite(article.slug)
          article.favorited = true
          article.favoritesCount += 1
        }
        article.favoriteDisable = false
      }
    }
  }
</script>

<style scope>

</style>