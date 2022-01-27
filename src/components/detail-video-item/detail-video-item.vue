<template>
  <div class="detail-video-item">
    <div class="album">
      <img :src="item.coverUrl" alt="coverUrl" />
      <span class="count">{{ formatCount(item.playTime) }}</span>
    </div>
    <div class="info">
      <div class="title">{{ item.title }}</div>
      <div class="nickname">{{ item.creator[0].userName }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
import { formatCount } from '@/utils/format'
const props = defineProps<{ item: any }>()
</script>

<style lang="scss" scoped>
.detail-video-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .album {
    width: 120px;
    position: relative;
    margin-right: 10px;
    img {
      width: 100%;
      height: auto;
    }
    .count {
      position: absolute;
      bottom: 5px;
      right: 2px;
      font-size: $font-size-medium;
      color: $color-background;
    }
  }
  .info {
    flex: 1;
    .title {
      @include twoline();
      line-height: 18px;
      font-size: $font-size-medium;
      margin-bottom: 8px;
    }
    .nickname {
      color: $color-dark;
      font-size: $font-size-small;
    }
  }
}
</style>
