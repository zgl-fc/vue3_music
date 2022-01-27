import { onActivated, onDeactivated } from 'vue'

export function scrollToLast(ele: any) {
  //todo
  let lastScrollTop = 0
  onActivated(() => {
    ele.value.scrollTop = lastScrollTop
  })
  onDeactivated(() => {
    lastScrollTop = ele.value.scrollTop
  })
}
