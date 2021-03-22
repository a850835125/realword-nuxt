import { request } from '@/plugins/request'

/**
 * 获取文章标签列表
 * @returns 
 */
export const getTags = () => {
  return request({
    method:'GET',
    url: '/api/tags'
  })
}