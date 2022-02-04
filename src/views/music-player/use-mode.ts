import { computed } from 'vue'
import { useStore } from '@/store'
import { PLAY_MODE } from '@/utils/constant'

export default function useMode() {
  const store = useStore()
  const playMode = computed(() => store.state.musicPlay.playMode)
  const modeImg = computed(() => {
    const playModeVal = playMode.value
    return playModeVal === PLAY_MODE.Sequence
      ? require('@/assets/images/player/play_order.png')
      : playModeVal === PLAY_MODE.Random
      ? require('@/assets/images/player/play_random.png')
      : require('@/assets/images/player/play_repeat.png')
  })
  function changeMode() {
    const mode = (playMode.value + 1) % 3
    store.commit('musicPlay/changePlayMode', mode)
  }

  return {
    modeImg,
    changeMode
  }
}
