import request from '../index'

interface MVData {
  code: number
  data: any
  hasMore: boolean
  updatetime: number
}
export function getTopMV(offset: number, limit = 10) {
  return request.get<MVData>({
    url: '/top/mv',
    params: {
      offset,
      limit
    }
  })
}

export function getMVDetail(id: number) {
  return request.get({
    url: '/mv/detail',
    params: {
      mvid: id
    }
  })
}

export function getMVURL(id: number) {
  return request.get({
    url: '/mv/url',
    params: {
      id
    }
  })
}

export function getRelateMV(id: number) {
  return request.get({
    url: '/related/allvideo',
    params: {
      id
    }
  })
}
