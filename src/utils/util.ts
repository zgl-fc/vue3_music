export function debounce(fn, delay = 500) {
  // timer 是闭包中的
  let timer: any = null

  return function (this: any, ...args: any[]) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}

export function throttle(fn, delay = 100) {
  let timer: any = null
  return function (this: any, ...args) {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn.apply(this, args)
      timer = null
    }, delay)
  }
}
