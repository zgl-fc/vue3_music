<template>
  <transition name="mini">
    <div class="mini-player" @click="fullScreen">
      <div class="bg-img" :style="bgImg"></div>
      <div class="cover"></div>
      <div class="song-info">
        <img
          :class="['rotate-img', isPlaying ? 'active' : 'pause']"
          :src="rotateImg"
          alt="small-img"
        />
        <span class="info">
          {{ currentSong.name }} -
          {{ currentSong.ar && currentSong.ar[0].name }}
        </span>
      </div>
      <div class="opration">
        <img
          v-if="isPlaying"
          src="@/assets/images/player/play_pause.png"
          alt="pause"
          @click.stop="changPlayState(false)"
        />
        <img
          v-else
          src="@/assets/images/player/play_resume.png"
          alt="play"
          @click.stop="changPlayState(true)"
        />
      </div>
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'

import { getSizeImage } from '@/utils/format'

// vuex
const store = useStore()
const currentSong = computed(() => store.getters['musicPlay/currentSong'])
const isPlaying = computed(() => store.state.musicPlay.playing)
const rotateImg = computed(() => getSizeImage(currentSong.value.al?.picUrl, 50))
const bgImg = computed(
  () => `background-image: url(${currentSong.value.al?.picUrl})`
)

// methods
const fullScreen = () => {
  store.commit('musicPlay/changeFullScreen', true)
}
const changPlayState = (playing: boolean) => {
  store.commit('musicPlay/changePlaying', playing)
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
.mini-player {
  position: fixed;
  bottom: 50px;
  left: 0;
  right: 0;
  z-index: 100;
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.8);
  &.mini-enter-active,
  &.mini-leave-active {
    transition: all 0.6s cubic-bezier(0.45, 0, 0.55, 1);
  }
  &.mini-enter-from,
  &.mini-leave-to {
    opacity: 0;
    transform: translate3d(0, 100%, 0);
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
  .song-info {
    display: flex;
    align-items: center;
    padding-left: 20px;
    color: #fff;
    .rotate-img {
      width: 55px;
      height: 55px;
      border-radius: 55px;
      margin-right: 15px;
      animation: spin 8s linear infinite;
      &.active {
        animation-play-state: running;
      }
      &.pause {
        animation-play-state: paused;
      }
    }
  }

  .opration {
    img {
      width: 45px;
      height: 45px;
    }
    margin-right: 20px;
  }
}
</style>
