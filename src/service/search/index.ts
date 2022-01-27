import request from '../index'

export function getHotSearch() {
  return request.get({ url: '/search/hot' })
}

export function getSuggestSearch(value: string) {
  return request.get({
    url: '/search/suggest',
    params: {
      keywords: value
    }
  })
}

export function getSearchResult(value: string) {
  return request.get({
    url: '/search',
    params: {
      keywords: value
    }
  })
}
