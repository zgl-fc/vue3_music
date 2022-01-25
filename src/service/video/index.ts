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
