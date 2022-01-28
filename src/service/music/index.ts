import request from '../index'

interface BannersData {
  banners: any
  code: number
}
export function getBanners() {
  return request.get<BannersData>({
    url: '/banner',
    params: {
      type: 2
    }
  })
}

interface TopListData {
  playlist: any
  code: number
}
/**
 * 获取榜单 0 飙升 1 热门 2 新歌 3 原创
 * @param {} idx
 */
export function getTopList(idx: number) {
  return request.get<TopListData>({
    url: '/top/list',
    params: {
      idx
    }
  })
}

interface SongMenuTags {
  code: number
  tags: any[]
}
export function getSongMenuTags() {
  return request.get<SongMenuTags>({ url: '/playlist/hot' })
}

interface SongMenuData {
  code: number
  playlists: any
  cat: string
  total: number
  more: boolean
}
/**
 * 请求歌单数据
 * @param {*} cat 类别
 * @param {*} limit 个数
 */
export function getSongMenu(cat = '全部', limit = 6) {
  return request.get<SongMenuData>({
    url: '/top/playlist',
    params: {
      cat,
      limit
    }
  })
}

/**
 * 歌单详情
 * @param {} id 歌单id
 */
export function getSongMenuList(id: number) {
  return request.get({
    url: '/playlist/detail/dynamic',
    params: {
      id
    }
  })
}
