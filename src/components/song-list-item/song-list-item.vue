<template>
  <div class="song-list-item">
    <div class="top">
      <img :src="songitem.coverImgUrl" alt="img" />
      <view class="play-counter">{{ formatCount(songitem.playCount) }}</view>
    </div>
    <div class="bottom">{{ songitem.name }}</div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { formatCount } from '@/utils/format'
const props = defineProps<{ songitem: any }>()
</script>

<style lang="scss" scoped>
.song-list-item {
  width: 100%;
  .top {
    position: relative;
    margin-bottom: 3px;
    img {
      width: 100%;
      height: auto;
      border-radius: 10px;
    }
    .play-counter {
      position: absolute;
      bottom: 5px;
      right: 3px;
      color: #fff;
      font-size: 12px;
      border-radius: 12px;
      padding: 3px 5px;
      background: rgba(0, 0, 0, 0.5);
    }
  }
  .bottom {
    line-height: 16px;
    font-size: $font-size-medium;
    white-space: normal;
    @include twoline();
  }
}
</style>
