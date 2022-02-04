<template>
  <router-view :style="bottomSty" v-slot="{ Component }">
    <transition appear name="slide">
      <keep-alive :include="['Music', 'Video', 'MoreSongMenu', 'Rank']">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>
  <MusicPlayer></MusicPlayer>
  <Tabbar></Tabbar>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useStore } from '@/store'

import MusicPlayer from './views/music-player'
import Tabbar from './components/tabbar'

const store = useStore()

const bottomSty = computed(() => {
  const bottom = store.state.musicPlay.playlist.length !== 0 ? '110px' : '50px'
  return `bottom: ${bottom}`
})
</script>

<style lang="scss"></style>
