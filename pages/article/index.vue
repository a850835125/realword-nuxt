<template>
  <div class="article-page">

    <div class="banner">
      <div class="container">

        <h1>{{ article.title }}</h1>

        <article-meta :article="article" />

      </div>
    </div>

    <div class="container page">

      <div class="row article-content">
        <!-- 使用了 markdown-it 的工具以后，渲染完的文章正文，使用 v-html 去把文章解析成 html 方式 -->
        <div class="col-md-12" v-html="article.body">

        </div>
      </div>

      <hr />

      <div class="article-actions">
        <article-meta :article="article" />
      </div>

      <div class="row">

        <div class="col-xs-12 col-md-8 offset-md-2">

          <article-comments :article="article"/>

        </div>

      </div>

    </div>

  </div>
</template>

<script>
  import {
    getArticle
  } from '@/api/article'
  import MarkdownIt from 'markdown-it'
  import ArticleMeta from './components/article-meta'
  import ArticleComments from './components/article-comments'

  export default {
    name: 'ArticleIndex',
    components: {
      ArticleMeta,
      ArticleComments
    },
    props: {},
    data() {
      return {}
    },
    async asyncData({
      params
    }) {
      const {
        data
      } = await getArticle(params.slug)
      const {
        article
      } = data
      // 使用 markdown-it 渲染 markdown 的文章
      const md = new MarkdownIt()
      article.body = md.render(article.body)
      return {
        article
      }
    },
    // 页面 title ，用于 seo 优化
    head() {
      return {
        title: `${this.article.title} - RealWorld`,
        meta: [{
          hid: 'description',
          name: 'description',
          content: this.article.description
        }]
      }
    },
    computed: {},
    watch: {},
    create() {},
    mounted() {},
    methods: {}
  }
</script>

<style scope>

</style>