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
