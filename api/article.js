import { request } from '@/plugins/request'

/**
 * 获取公共文章列表
 * @param {*} params 
 * @returns 
 */
export const getArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles',
    params
  })
}

/**
 * 获取关注的文章列表
 * @param {*} params 
 */
export const getFeedArticles = params => {
  return request({
    method: 'GET',
    url: '/api/articles/feed',
    params
  })
}

/**
 * 文章点赞
 * @param {*} slug 
 * @returns 
 */
export const addFavorite = slug => {
  return request({
    method: 'POST',
    url: `/api/articles/${slug}/favorite`
  })
}

/**
 * 取消文章点赞
 * @param {*} slug 
 * @returns 
 */
export const unFavorite = slug => {
  return request({
    method: 'DELETE',
    url: `/api/articles/${slug}/favorite`
  })
}

/**
 * 获取文章详情
 * @param {*} slug 
 * @returns 
 */
export const getArticle = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}`
  })
}

/**
 * 获取文章评论
 * @param {*} slug 
 * @returns 
 */
export const getComments = slug => {
  return request({
    method: 'GET',
    url: `/api/articles/${slug}/comments`
  })
}