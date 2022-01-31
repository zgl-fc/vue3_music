import request from '../index'

export function getPlayerMusic(ids: number) {
  return request.get({
    url: '/song/detail',
    params: {
      ids
    }
  })
}

export function getPlayerLyric(id: number) {
  return request.get({
    url: '/lyric',
    params: {
      id
    }
  })
}
