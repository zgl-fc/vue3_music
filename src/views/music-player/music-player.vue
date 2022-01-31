<template>
  <div class="music-player">
    <div class="top" @click="scroll">
      <img
        class="back"
        src="@/assets/images/icons/arrow-left.png"
        alt="back"
        @click="back"
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
    >
      <SwipeItem>
        <div class="song-img">
          <img
            :src="
              getSizeImage(
                'http://p4.music.126.net/a1swuA1r3FVmcL6cHcG5ww==/109951166983148290.jpg',
                500
              )
            "
            alt="img"
          />
        </div>
        <div class="content">
          <div class="info">
            <h1 class="song-name">男二号</h1>
            <div class="subtitle">
              <p>男二号</p>
              <p>专辑名: 不爱就拉倒</p>
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
            <img
              class="btn btn-mode"
              src="@/assets/images/player/play_order.png"
            />
            <img
              class="btn btn-prev"
              src="@/assets/images/player/play_prev.png"
              @click="pause"
            />
            <img
              class="btn btn-pause"
              src="@/assets/images/player/play_pause.png"
              @click="play"
            />
            <img
              class="btn btn-next"
              src="@/assets/images/player/play_next.png"
            />
            <img
              class="btn btn-list"
              src="@/assets/images/player/play_music.png"
            />
          </div>
        </div>
      </SwipeItem>
      <SwipeItem>
        <div class="lyric-list-wrapper" ref="listWraper">
          <div class="lyric-list">
            <template v-for="(item, index) in lyricList" :key="index">
              <p :class="{ lyric: true, active: index === currentLyricIndex }">
                {{ item.content }}
              </p>
            </template>
          </div>
        </div>
      </SwipeItem>
    </Swipe>
    <audio
      ref="audioRef"
      autoplay
      @pause="pause"
      @canplay="ready"
      @error="error"
      @timeupdate="updateTime"
      @ended="end"
    ></audio>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed, watch } from 'vue'
import { useRouter } from 'vue-router'
import { Swipe, SwipeItem } from 'vant'

import { getSizeImage } from '@/utils/format'
import { getPlayerMusic, getPlayerLyric } from '@/service/player'

import { scrollTo } from './scrollTo'
import { parseLyric } from './lyric-parse'
// import { useStore } from '@/store'

import { Slider } from 'vant'
const router = useRouter()
// const store = useStore()
const listWraper = ref<any>()
const swiperIndex = ref(0)
const audioRef = ref<HTMLAudioElement | null>(null)
const currentTime = ref(0)
const lyricList = ref<any>([])
const currentLyricIndex = ref(0)
const currentContent = ref('')
let id = 1915297033

function getPageData() {
  getPlayerMusic(id).then((res) => {
    console.log(res)
  })
  getPlayerLyric(id).then((res) => {
    lyricList.value = parseLyric(res.lrc.lyric)
    console.log(lyricList.value)
  })
}
getPageData()

const processVal = computed({
  get: () => {
    // return currentTime.value
    return (currentTime.value * 1000) / 287579
  },
  set: (newVal) => {
    if (audioRef.value) {
      audioRef.value.currentTime = currentTime.value = (newVal * 287579) / 1000
    }
  }
})
let isProcessChanging = false

// const songInfo = computed(() => {
//   return store.state.musicPlay.playSongInfo
// })
const bgImg = `background-image: url('http://p4.music.126.net/a1swuA1r3FVmcL6cHcG5ww==/109951166983148290.jpg')`
// const bgImg = computed(() => {
//   return `background-image: url(${songInfo.value && songInfo.value.al.picUrl})`
// })

onMounted(() => {
  if (audioRef.value) {
    audioRef.value.src = `https://music.163.com/song/media/outer/url?id=1915297033.mp3`
  }
})

const scroll = (number) => {
  listWraper.value.scrollTop = number
  // scrollTo(listWraper.value, number, 1000)
}

watch(currentLyricIndex, (val) => {
  // listWraper.value.scrollTop = val * 35
  scrollTo(listWraper.value, val * 35, 500)
})

const changeSwiperIndex = (index) => {
  swiperIndex.value = index
}

const back = () => {
  router.back()
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
  audioRef.value?.play()
}

const pause = () => {
  audioRef.value?.pause()
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
  console.log('歌曲播放结束')
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
  z-index: 10;
  color: #fff;
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
    width: 80%;
    margin: 100px auto;
    img {
      width: 100%;
      height: 100%;
      border-radius: 100%;
      animation: spin 8s linear infinite;
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
      .btn-pause {
        width: 65px;
        height: 65px;
      }
    }
  }
  .lyric-list-wrapper {
    height: 100%;
    margin-top: 40px;
    overflow: scroll;
    &::-webkit-scrollbar {
      display: none;
    }

    .lyric-list {
      padding: 150px 0;
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
