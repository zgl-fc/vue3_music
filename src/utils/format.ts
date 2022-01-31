export function getSizeImage(imgUrl: string, size = 80) {
  return `${imgUrl}?param=${size}x${size}`
}

export function getSizeImageY(imgUrl: string, size = 50) {
  return `${imgUrl}?param=${size}y${size}`
}

export function formatCount(count: number) {
  const counter = parseInt(count as any)
  if (counter > 100000000) {
    return (counter / 100000000).toFixed(1) + '亿'
  } else if (counter > 10000) {
    return (counter / 10000).toFixed(1) + '万'
  } else {
    return counter + ''
  }
}

// 12 -> 12
// 5 -> 05
export function padLeftZero(time: number) {
  const timeStr = time + ''
  return ('00' + timeStr).slice(timeStr.length)
}

export function formatDuration(duration: number) {
  duration = duration / 1000
  // 488s / 60 = 8.12
  const minute = Math.floor(duration / 60)
  // 488s % 60
  const second = Math.floor(duration) % 60

  return padLeftZero(minute) + ':' + padLeftZero(second)
}
