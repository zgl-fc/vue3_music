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
