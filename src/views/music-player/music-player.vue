<template>
  <transition name="music-player">
    <div class="music-player" v-show="playlist.length !== 0 && fullScreen">
      <div class="top">
        <img
          class="back"
          src="@/assets/images/icons/arrow-left.png"
          alt="back"
          @click="showMini"
        />
        <div class="song-lyric">
          <span :class="{ 'color-dark': swiperIndex !== 0 }">歌曲</span>
          <span class="division">|</span>
          <span :class="{ 'color-dark': swiperIndex === 0 }">歌词</span>
        </div>
      </div>
      <div class="bg-img" :style="bgImg"></div>
      <div class="cover"></div>
      <Swipe
        class="swiper"
        :show-indicators="false"
        @change="changeSwiperIndex"
        :loop="false"
        ref="swiperRef"
      >
        <SwipeItem>
          <div class="song-img">
            <img
              :class="isPlaying ? 'active' : 'pause'"
              :src="rotateImg"
              alt="img"
            />
          </div>
          <div class="content">
            <div class="info">
              <h1 class="song-name">{{ currentSong.name }}</h1>
              <div class="subtitle">
                <p>{{ currentSong.al && currentSong.al.name }}</p>
                <p>歌手: {{ currentSong.ar && currentSong.ar[0].name }}</p>
              </div>
            </div>
            <div class="lyric">{{ currentContent }}</div>
            <div class="process">
              <Slider
                v-model="processVal"
                @drag-start="processChanging"
                @drag-end="processChanged"
                max="1"
                step="0.01"
                bar-height="4px"
                button-size="15px"
              ></Slider>
            </div>
            <div class="oprations">
              <img class="btn btn-mode" :src="modeImg" @click="changeMode" />
              <img
                class="btn btn-prev"
                src="@/assets/images/player/play_prev.png"
                @click="prev"
              />
              <img
                v-show="isPlaying"
                class="btn btn-pause"
                src="@/assets/images/player/play_pause.png"
                @click="pause"
              />
              <img
                v-show="!isPlaying"
                class="btn btn-play"
                src="@/assets/images/player/play_resume.png"
                @click="play"
              />
              <img
                class="btn btn-next"
                src="@/assets/images/player/play_next.png"
                @click="next"
              />
              <img
                class="btn btn-list"
                src="@/assets/images/player/play_music.png"
                @click="showPlaylist"
              />
            </div>
          </div>
        </SwipeItem>
        <SwipeItem>
          <div class="lyric-list-wrapper" ref="lyricListWraperRef">
            <div class="lyric-list" :style="lyricPaddingStyle">
              <template v-for="(item, index) in lyricList" :key="index">
                <p
                  :class="{ lyric: true, active: index === currentLyricIndex }"
                >
                  {{ item.content }}
                </p>
              </template>
            </div>
          </div>
        </SwipeItem>
      </Swipe>
      <Playlist ref="playlistRef"></Playlist>
    </div>
  </transition>
  <MiniPlayer v-show="playlist.length !== 0 && !fullScreen"></MiniPlayer>
  <audio
    ref="audioRef"
    autoplay
    @pause="pause"
    @canplay="ready"
    @error="error"
    @timeupdate="updateTime"
    @ended="end"
  ></audio>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useStore } from '@/store'
import useMode from './use-mode'

import { Swipe, SwipeItem, Slider } from 'vant'
import MiniPlayer from './mini-player.vue'
import Playlist from './playlist.vue'

import { getPlayerMusic } from '@/service/player'

import { scrollTo } from './scrollTo'
import { parseLyric } from './lyric-parse'
import { PLAY_MODE } from '@/utils/constant'
import { getSizeImage } from '@/utils/format'

// data
const playlistRef = ref<InstanceType<typeof Playlist> | null>(null)
const swiperRef = ref<any>()
const audioRef = ref<HTMLAudioElement | null>(null)
const lyricListWraperRef = ref<HTMLDivElement | null>(null) // 获取包裹歌词的DIV
const swiperIndex = ref(0) // 左右滑的index(0 | 1)
const currentTime = ref(0)
const currentLyricIndex = ref(0) // 当前歌词在数组中的index
const currentContent = ref('') // 当前歌词
const lyricPaddingStyle = `padding-top: ${window.innerHeight / 2 - 100}px` // 把歌词调整到屏幕中间
let isProcessChanging = false

// vuex
const store = useStore()
const playMode = computed(() => store.state.musicPlay.playMode)
const fullScreen = computed(() => store.state.musicPlay.fullScreen)
const playlist = computed(() => store.state.musicPlay.playlist)
const currentIndex = computed(() => store.state.musicPlay.currentIndex)
const currentSong = computed(() => store.getters['musicPlay/currentSong'])
const isPlaying = computed(() => store.state.musicPlay.playing)
const lyricList = computed(() =>
  parseLyric(store.getters['musicPlay/currentLyric'])
)

// hooks
const { modeImg, changeMode } = useMode()

// computed
const processVal = computed({
  get: () => {
    return (currentTime.value * 1000) / currentSong.value.dt
  },
  set: (newVal) => {
    if (audioRef.value) {
      audioRef.value.currentTime = currentTime.value =
        (newVal * currentSong.value.dt) / 1000
    }
  }
})
const bgImg = computed(
  () => `background-image: url(${currentSong.value.al?.picUrl})`
)
const rotateImg = computed(() =>
  getSizeImage(currentSong.value.al?.picUrl, 500)
)

// watch
watch(currentSong, (newSong) => {
  if (!newSong.id) return
  const tempAudio = audioRef.value
  tempAudio?.play()
  currentTime.value = 0
  if (tempAudio) {
    tempAudio.src = `https://music.163.com/song/media/outer/url?id=${newSong.id}.mp3`
  }
  store.commit('musicPlay/changePlaying', true)
})
watch(isPlaying, (newval) => {
  const audioEl = audioRef.value
  if (audioEl) {
    newval ? audioEl.play() : audioEl.pause()
  }
})
// 监听当前歌词在数组中的位置 通过自己的滚动函数来实现平滑的滚动
watch(currentLyricIndex, (val) => {
  scrollTo(lyricListWraperRef.value, val * 35, 500)
})
watch(fullScreen, () => {
  swiperRef.value.resize()
})

// methods
const changeSwiperIndex = (index) => {
  swiperIndex.value = index
}
const showMini = () => {
  store.commit('musicPlay/changeFullScreen', false)
}
const processChanging = (e) => {
  isProcessChanging = true
}
const processChanged = (e) => {
  isProcessChanging = false
  if (audioRef.value) {
    audioRef.value.currentTime = currentTime.value
  }
}
const play = () => {
  store.commit('musicPlay/changePlaying', true)
}
const pause = () => {
  store.commit('musicPlay/changePlaying', false)
}
function getRandomIndex(n) {
  return Math.floor(Math.random() * n)
}
function prev() {
  const len = playlist.value.length
  if (!len) {
    return
  }
  if (playMode.value === PLAY_MODE.Random) {
    let index = getRandomIndex(len)
    store.commit('musicPlay/changeCurrentIndex', index)
  } else if (len === 1) {
    loop()
  } else {
    let index = currentIndex.value - 1
    if (index === -1) {
      index = len - 1
    }
    store.commit('musicPlay/changeCurrentIndex', index)
  }
}
function next() {
  const len = playlist.value.length
  if (!len) {
    return
  }
  if (playMode.value === PLAY_MODE.Random) {
    let index = getRandomIndex(len)
    store.commit('musicPlay/changeCurrentIndex', index)
  } else if (len === 1) {
    loop()
  } else {
    let index = currentIndex.value + 1
    if (index === len) {
      index = 0
    }
    store.commit('musicPlay/changeCurrentIndex', index)
  }
}
function loop() {
  const audioEl = audioRef.value
  if (audioEl) {
    audioEl.currentTime = 0
    audioEl.play()
  }
  store.commit('musicPlay/changePlaying', true)
}
const ready = () => {
  console.log('ready')
}
const error = () => {
  console.log('error')
}
const updateTime = (e) => {
  const tmpTime = e.target.currentTime
  if (!isProcessChanging) {
    currentTime.value = tmpTime
  }
  // 获取需要展示的歌词
  const tmpList = lyricList.value
  const tmpLyricIndex = currentLyricIndex.value
  let i = 0
  for (; i < tmpList.length; i++) {
    let lyricItem = tmpList[i]
    if (tmpTime * 1000 < lyricItem.time) {
      break
    }
  }
  if (tmpLyricIndex !== i - 1) {
    currentLyricIndex.value = i - 1
    const content = tmpList[i - 1] && tmpList[i - 1].content
    currentContent.value = content
  }
}
const end = () => {
  currentTime.value = 0
  if (playMode.value === PLAY_MODE.Loop) {
    loop()
    return
  }
  next()
}
const showPlaylist = () => {
  playlistRef.value?.show()
}
</script>

<style lang="scss" scoped>
@keyframes spin {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.music-player {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 99;
  color: #fff;
  &.music-player-enter-active,
  &.music-player-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.music-player-enter-from,
  &.music-player-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
  }
  .top {
    position: fixed;
    z-index: 11;
    width: 100%;
    padding-top: 15px;
    .back {
      position: absolute;
      margin-left: 10px;
      width: 25px;
      height: 25px;
      transform: rotate(270deg);
    }
    .song-lyric {
      text-align: center;
      line-height: 25px;
      height: 25px;
      .division {
        margin: 0 10px;
        position: relative;
        top: -1px;
      }
      .color-dark {
        color: #aaa;
      }
    }
  }
  .bg-img {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-size: cover;
  }
  .cover {
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: -1;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(50px);
  }
  .song-img {
    margin-top: 100px;
    text-align: center;
    width: 60%;
    margin: 100px auto 0;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      animation: spin 8s linear infinite;
      &.active {
        animation-play-state: running;
      }
      &.pause {
        animation-play-state: paused;
      }
    }
  }
  .swiper {
    height: 100%;
  }
  .content {
    position: absolute;
    box-sizing: border-box;
    width: 100%;
    bottom: 20px;
    z-index: 100;
    padding: 0 30px;
    .info {
      padding-bottom: 10px;
      .song-name {
        font-size: 20px;
        margin-bottom: 8px;
      }
      .subtitle {
        line-height: 20px;
        color: #ccc;
      }
    }
    .lyric {
      padding: 10px 0;
      text-align: center;
    }
    .process {
      padding: 15px 0;
    }
    .oprations {
      display: flex;
      justify-content: space-between;
      align-items: center;
      .btn {
        width: 30px;
        height: 30px;
      }
      .btn-mode {
        width: 40px;
        height: 40px;
      }
      .btn-pause,
      .btn-play {
        width: 65px;
        height: 65px;
      }
    }
  }
  .lyric-list-wrapper {
    height: 100%;
    margin-top: 40px;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    &::-webkit-scrollbar {
      display: none;
    }

    .lyric-list {
      padding-bottom: 150px;
      text-align: center;
      .lyric {
        line-height: 35px;
      }
      .active {
        color: #26ce8a;
      }
    }
  }
}
</style>
