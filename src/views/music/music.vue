<template>
  <div class="music-page">
    <Swiper :banners="banners"></Swiper>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Swiper from '@/components/swiper'
import { getBanners } from '@/service/music'
const banners = ref<any>([])
getBanners().then((data) => {
  if (data.code === 200) {
    banners.value = data.banners
  }
})
</script>

<style lang="scss" scoped>
.music-page {
  position: fixed;
  top: 0px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow: scroll;
}
</style>
